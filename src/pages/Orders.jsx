import { useUserContext } from '../context/userContext';
import { useEffect, useState } from 'react';
import { fetchToDb } from '../../utils/utils';
import { baseUrl } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom'; 
import Spinner from '../components/Spinner';
import OrderCard from '../components/OrderCard';
import toast from 'react-hot-toast';
import CreateBtn from '../components/buttons/CreateBtn';

export default function Orders() {
    
    const navigate = useNavigate();
    const {isAuthenticated, user} = useUserContext();
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    const tabClass =`cursor-pointer px-2 py-1 rounded-md hover:text-[var(--primary)]`;

    const onStatusUpdated = (newStatus, orderId) => {
        setOrders(prev =>
            prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
        );
    }

     useEffect(()=> {
        if(!isAuthenticated) {
            navigate('/auth/login');
            return;
        }   
        fetchToDb(baseUrl, 'GET', null, 'orders', user)
            .then(data => {
                if (!data) {
                    toast.error('No orders found.');
                    setLoading(false);
                    navigate('./new');
                    return;
                }
                const transformedData = Object.keys(data)
                    .map(key => {
                        return {
                            id: key,
                            ...data[key]
                        }
                    }) 
                    .filter(order => activeTab === 'all' ? true : order.status === activeTab);
                
                setOrders(transformedData);
                setLoading(false);
                
            })
    }, [activeTab, orders.length]);

    return ( loading 
                ? 
            <Spinner />
                : 
            <div className='dark:bg-stone-900 
                            min-h-[calc(100vh-72px)] 
                            p-4 
                            dark:text-white
                            bg-stone-200
                            '
            >
                {/* Navigation buttons */}
                <div className="flex gap-1 mt-4 ml-4">
                    <button 
                        className={
                            tabClass + ' ' +
                            `${activeTab === 'all' ? 'bg-[var(--primary)] hover:text-white' : 'bg-gray-200'} 
                            ${activeTab === 'all' ? 'dark:bg-green-300 dark:hover:bg-emerald-400 text-black' : 'dark:bg-[var(--primary-dark)]'}`
                        }
                        onClick={() => setActiveTab('all')}
                    >
                        All Orders
                    </button>
                    <button 
                        className={
                            tabClass + ' ' +
                            `${activeTab === 'pending' ? 'bg-[var(--primary)] hover:text-white' : 'bg-gray-200'} 
                            ${activeTab === 'pending' ? 'dark:bg-green-300 dark:hover:bg-emerald-400 text-black' : 'dark:bg-[var(--primary-dark)]'}`
                        }
                        onClick={() => setActiveTab('pending')}
                    >
                        Pending
                    </button>
                    <button 
                        className={
                            tabClass + ' ' +
                            `${activeTab === 'packed' ? 'bg-[var(--primary)] hover:text-white' : 'bg-gray-200'} 
                            ${activeTab === 'packed' ? 'dark:bg-green-300 dark:hover:bg-emerald-400 text-black' : 'dark:bg-[var(--primary-dark)]'}`
                        }
                        onClick={() => setActiveTab('packed')}
                    >
                        Packed
                    </button>
                    <button 
                        className={
                            tabClass + ' ' + 
                            `${activeTab === 'shipped' ? 'bg-[var(--primary)] hover:text-white' : 'bg-gray-200'} 
                            ${activeTab === 'shipped' ? 'dark:bg-green-300 dark:hover:bg-emerald-400 text-black' : 'dark:bg-[var(--primary-dark)]'}`
                        }
                        onClick={() => setActiveTab('shipped')}
                    >
                        Shipped
                    </button>
                    
                    <CreateBtn url='./new' />
                </div>

                <br/><br/>
                {/* Orders listing */}
                <div className="flex flex-wrap gap-4 ml-4">
                    {orders.map(order => (
                        <OrderCard 
                            key={order.id}
                            order={order}
                            onStatusUpdated={onStatusUpdated} 
                        />
                    ))}
                </div>
            </div>
    )
};    