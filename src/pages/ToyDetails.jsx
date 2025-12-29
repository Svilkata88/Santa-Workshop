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
                <>
                    <h2>Toy Details</h2>
                    <h3>{toy?.name}</h3>
                    <p>Category: {toy?.category}</p>
                    <p>Difficulty: {toy?.difficulty}</p>
                    <p>In Stock: {toy?.inStock}</p>
                    <p>Description: {toy?.description}</p>
                </>
            ));
    }