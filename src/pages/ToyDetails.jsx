    import { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { fetchById } from '../../utils/utils';
    import { baseUrl } from '../../firebase/firebaseConfig';
    import { useUserContext } from '../context/userContext';
    import Spinner from '../components/Spinner';

    export default function ToyDetails() {
        const { user, isAuthenticated } = useUserContext();
        const { id } = useParams();
        const [ toy, setToy ] = useState(null);
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();

        useEffect(() => {
            if(!isAuthenticated) {
                navigate('/auth/login');
                return;
            }   
            fetchById(baseUrl, 'toys', id, user)
            .then(data => {
                setToy(data);
                setLoading(false);
            });
        }, [id]);

        return ( loading ? (
            <Spinner />
            ) : (
                <div className='
                        dark:bg-stone-900 
                        dark:text-white 
                        min-h-[calc(100vh-72px)] 
                        p-4
                        bg-stone-200'
                >   
                    <h1 className="text-center mb-10 text-lg">Toy Details</h1>
                    <div className='
                            bg-[var(--primary)] dark:bg-[var(--primary-dark)] 
                            py-4 px-15 
                            rounded-md 
                            ml-auto mr-auto
                            flex flex-col gap-3
                            w-[400px]
                            min-h-[300px]
                    '>
                        <h3 className='mb-5 text-center'>{toy?.name}</h3>
                        <div className='flex gap-3'>
                            <p className='w-1/2'>Category:</p>
                            <p className='w-1/2'>{toy?.category}</p>
                        </div>
                        <div className='flex gap-3'>
                            <p className='w-1/2'>Difficulty:</p>
                            <p className='w-1/2'>{toy?.difficulty}</p>
                        </div>
                        <div className='flex gap-3'>
                            <p className='w-1/2'>In Stock:</p>
                            <p className='w-1/2'>{toy?.inStock}</p>
                        </div>
                        <div className='flex gap-3'>
                            <p className='w-1/2'>Description:</p>
                            <p className='w-1/2'>{toy?.description}</p>
                        </div>
                    </div>
                </div>
            ));
    }