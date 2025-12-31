import { useState, useEffect } from 'react';
import ChristmasTimeLeft from '../components/CristmasTimeLeft';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { fetchToDb } from '../../utils/utils';
import { baseUrl } from '../../firebase/firebaseConfig';
import Spinner from '../components/Spinner';
import Notice from '../components/Notice';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useUserContext();
    const [toatlToys, setTotalToys] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [activeElves, setActiveElves] = useState(0)

    useEffect( ()=> {
        if (!isAuthenticated) {
            navigate('/auth/login');
            return;
        }

        fetchToDb(baseUrl, 'GET', null, 'toys', user)
            .then(data => setTotalToys(Object.values(data).length));
        

        fetchToDb(baseUrl, 'GET', null, 'orders', user)
            .then(data => setPendingOrders(Object.values(data)
                .filter(order => order.status === 'pending')
                .length
            ))
        
        fetchToDb(baseUrl, 'GET', null, 'elves', user)
            .then(data => setActiveElves(Object.values(data)
                .filter(elf => elf.tasks?.length > 0)
                .length
            ))
            
        setLoading(false);
    }, [isAuthenticated]);

    const notices = [
        '🎅 Workshop Status: All departments are operating smoothly. Keep up the great work, elves!',
        '🧸 Toy Production Notice: Priority toys for Christmas Eve are now in final assembly.',
        '❄️ Weather Alert: Snowfall expected near the North Pole. Allow extra time for deliveries.',
        '🔔 Quality Reminder: Double-check all toys before packaging to ensure top quality.',
        '🔔 Quality Reminder: Double-check all toys before packaging to ensure top quality.'
    ];

    return (
        loading 
            ?
        <Spinner />
            :
        <div className="relative h-[calc(100vh-56px)] w-full overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src="/video/welcomeVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <ChristmasTimeLeft targetDate={'2025-12-31T00:00:00'} />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex flex-col gap-10 h-full items-center justify-start text-white text-center">
                <div className='mt-14'>
                    <h1 className="text-4xl font-bold mb-4">Santa Workshop 🎅</h1>
                    <p className="text-lg">Create magic orders effortlessly</p>
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-4">Christmas status</h1>
                    <p className="text-lg">Total Toys: {toatlToys}</p>
                    <p className="text-lg">Pending Orders: {pendingOrders}</p>
                    <p className="text-lg">Active Elves: {activeElves}</p>
                </div>
                <div className='flex gap-10'>
                    {notices.map( (_, i) => (
                        <Notice message={notices[i]} />
                    ))}
                </div>
            </div>
        </div>

    )
};  