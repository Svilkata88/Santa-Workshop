
import { baseUrl } from '../../firebase/firebaseConfig';
import { useUserContext } from '../context/userContext';
import { fetchToDb, patchToDb } from '../../utils/utils';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderFormRow from './OrderFormRow';
import FormErrorMessage from './FormErrorMessage';
import Spinner from './Spinner';
import { validate } from '../../utils/utils';
import FormSubmitBtn from './buttons/FormSubmitBtn';

export default function CreateOrder() {
    const { user, isAuthenticated } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([0]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [toys, setToys] = useState([]); 
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('normal');
    
    useEffect(()=> {
        if(!isAuthenticated) {
            navigate('/auth/login');
            return;
        }   
        fetchToDb(baseUrl, 'GET', null, 'toys', user)
            .then(data => {
                if (!data) {
                    toast.error('No toys found. Create a toy first.');
                    navigate('/toys/create-toy');
                    setLoading(false);
                    return;
                }
                const transformedData = Object.keys(data).map(key => {
                // returning only toys that are in stock
                    const toysData = data[key];
                    const inStock = Number(toysData.inStock);
                    const toysInStock = inStock > 0 ? inStock : null;

                    if(toysInStock) {    
                        return {
                            id: key,
                            ...toysData
                        }
                    }
                    return null;
                })
                setToys(transformedData.filter(toy => toy !== null));
                setLoading(false);
            })
    }, []);
    
    const createOrderHandler = (formData) => {
        const toyIds = formData.getAll('toyId');
        const allToys = toys.filter(toy => toyIds.includes(toy.id));
        const qttys = formData.getAll('qtty');
        const childName = formData.getAll('childName');
        const status = formData.get('status');
        const country = formData.get('country');
        const priority = formData.get('priority');

        if (error) {
            toast.error('Please fill the form.');
            return;
        }

        const toysInTheOrder = allToys.map((toy, index) => {

            patchToDb(baseUrl, 'PATCH', { inStock: Number(toy.inStock) - Number(qttys[index]) }, `toys/${toy.id}`, user);
      
            return {
                toyId: toy.id, 
                toyName: toy.name,
                qtty: qttys[index],
                childName: childName[index],
            }
        });

        const body = {
            toys: toysInTheOrder,
            status,
            country,
            priority,
            createdAt: new Date().toISOString(),
        };


        fetchToDb(baseUrl, 'POST', body, 'orders', user);

        toast.success(
        <div className='flex flex-col gap-4'>
            <h3>Order was created!</h3>

            {allToys.map((item, i) => (
            <div key={item.id ?? i} className='flex justify-between'>
                <div>{item.name}</div>
                <div>Quantity: {qttys[i]}</div>
            </div>
            ))}
        </div>
        );
        navigate('/orders');
    };
    
    return ( 
        loading 
        ? 
        <Spinner/>
        :
        <div className='dark:bg-stone-900 
                        dark:text-white 
                        min-h-[calc(100vh-72px)] 
                        flex flex-col items-center justify-center'>
            <h1 className='pb-20 text-xl'>Create Order</h1>
            <form action={createOrderHandler} className="flex flex-col gap-4 items-start bg-[var(--primary-dark)] rounded-lg p-3" id='create-order-form-imput-container'>
                {rows.map((_, index) => (
                    <OrderFormRow 
                        key={index} 
                        toys={toys}
                        setError={setError}
                    />
                ))}

                <div className="flex gap-4 ml-auto mr-auto">
                    <button type="button" onClick={() => {
                            setRows(prevRows => [...prevRows, prevRows.length])
                        }} 
                        className="cursor-pointer">
                        <img src="/plus-btn.svg" alt="plus" className="w-8 h-8"/>
                    </button>
                    <button type="button" onClick={() => {
                            setRows(prev => prev.slice(0, -1));
                        }} className="cursor-pointer">
                        <img src="/minus-btn.png" alt="minus" className="w-8 h-8"/>
                    </button>
                </div>

                <input 
                    type="text" 
                    name="country" 
                    className='pl-4 py-2 border border-[var(--primary)] rounded-md w-4/9'
                    placeholder='country'
                    onBlur={(e) => setError(validate('country', e.target.value))}
                />
                <div className='flex justify-between w-full '>
                    <select name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        onBlur={(e) => setError(validate('status', e.target.value))}
                        className="select-field w-4/9"      
                    >
                        <option value="">status</option>
                        <option value="pending">pending</option>
                        <option value="packed">packed</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                    </select>
                    <select name="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        onBlur={(e) => setError(validate('priority', e.target.value))}
                        className="select-field w-4/9"  
                    >
                        <option value="">priority</option>
                        <option value="low">low</option>
                        <option value="normal">normal</option>
                        <option value="high">high</option>
                    </select>
                </div>

                <FormSubmitBtn text='Create the Order'/>
                
                <FormErrorMessage message={error}/>
            </form>
        </div>
    )
};  