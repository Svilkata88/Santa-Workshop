
import { baseUrl } from '../../firebase/firebaseConfig';
import { useUserContext } from '../context/userContext';
import { fetchToDb } from '../../utils/utils';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderFormRow from './OrderFormRow';
import FormErrorMessage from './FormErrorMessage';
import Spinner from './Spinner';
import { validate } from '../../utils/utils';

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
                const parsedData = JSON.parse(data[key] || {});
                const toysInStock = Number(parsedData.inStock || 0) > 0 ? parsedData : null;

                    if(toysInStock) {    
                        return {
                            id: key,
                            ...toysInStock
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

        const toysInTheOrder = allToys.map((toy, index) => ({
                toyId: toy.id, 
                toyName: toy.name,
                qtty: qttys[index],
                childName: childName[index],
        }))

        const body = JSON.stringify({
            toys: toysInTheOrder,
            status,
            country,
            priority,
            createdAt: new Date().toISOString(),
        });


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
        <div>
            <h1>Create Order</h1>
            <form action={createOrderHandler} className="flex flex-col gap-4 items-center" id='create-order-form-imput-container'>
                {rows.map((_, index) => (
                    <OrderFormRow 
                        key={index} 
                        toys={toys}
                        setError={setError}
                    />
                ))}

                <input 
                    type="text" 
                    name="country" 
                    placeholder='country'
                    onBlur={(e) => setError(validate('country', e.target.value))}
                />
                <select name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={(e) => setError(validate('status', e.target.value))}
                    className="select-field"    
                >
                    <option value="" selected>status</option>
                    <option value="pending">pending</option>
                    <option value="packed">packed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                </select>
                <select name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    onBlur={(e) => setError(validate('priority', e.target.value))}
                    className="select-field"  
                >
                    <option value="" selected>priority</option>
                    <option value="low">low</option>
                    <option value="normal">normal</option>
                    <option value="high">high</option>
                </select>
                
                <button type="submit" className="cursor-pointer">Create the Order</button>
                
                <div className="flex gap-4">
                    <button type="button" onClick={() => {
                        setRows(prevRows => [...prevRows, prevRows.length])
                    }} className="cursor-pointer">
                        <img src="/plus-btn.svg" alt="plus" className="w-8 h-8"/>
                    </button>
                    <button type="button" onClick={() => {
                            setRows(prev => prev.slice(0, -1));
                        }} className="cursor-pointer">
                        <img src="/minus-btn.png" alt="minus" className="w-8 h-8"/>
                    </button>
                </div>
                <FormErrorMessage message={error} />
            </form>
        </div>
    )
};  