import { useState, useEffect } from 'react';
import { patchToDb } from '../../utils/utils';
import { baseUrl } from '../../firebase/firebaseConfig';
import toast from 'react-hot-toast';
import { useUserContext } from '../context/userContext';

export default function OrderCard({ order, onStatusUpdated }) {
    const { user } = useUserContext();
    const [isEditing, setIsEditing] = useState(false);

    const updateStatusHandler = (formData) => {  
        const body = {status: formData.get('status')};  
        
        patchToDb(baseUrl, 'PATCH', body, `orders/${order.id}`, user)
            .then(data => {
                toast.success('Order status updated successfully!');
                // update order status (client)
                onStatusUpdated(body.status, order.id); 
                // hide select status field
                setIsEditing(false);
                return null;
            })
    };

    useEffect(() => {
       
    }, [order.status]);

    return (
        <div key={order.id} className="bg-[var(--primary)] p-4 rounded-md mb-4 shadow-md dark:bg-[var(--primary-dark)] dark:text-white w-[300px] text-sm relative">
            <p className='mb-3'>Order ID: {order.id}</p>

            {
            order.toys.map((item) => {
                if (typeof item === 'object') {
                    return (
                        <div key={item.toyId} className="ml-4 mb-4">
                            <p>Toy: {item.toyName}</p>
                            <p>Quantity: {item.qtty}</p>    
                            <p>Child: {item.childName}</p>
                        </div>
                    )
                }
            })
            }
            <p>Country: {order.country}</p>
            <p className={isEditing ? 'hidden mt-2' : 'block mt-2'}>Status: {order.status}</p>
            <form className={ isEditing ? 'block mt-2' : 'hidden mt-2' } action={updateStatusHandler}>
                <select name="status"
                    defaultValue={order.status}
                    className="select-field"    
                >
                    <option value="">status</option>
                    <option value="pending">pending</option>
                    <option value="packed">packed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                </select>
                <button type="submit" className="ml-2 cursor-pointer">Confirm</button>
            </form>
            <button 
                className="absolute top-2 right-2 mt-2 cursor-pointer bg-transparent rounded-md hover:bg-gray-200" 
                onClick={() => setIsEditing(!isEditing)}
            >
                <img src="/edit.png" alt="Edit" className="w-8 h-8 inline-block p-0"/>
            </button>
        </div>
    )
};