import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";
import { fetchToDb } from "../../utils/utils";
import { baseUrl } from "../../firebase/firebaseConfig";
 import Spinner from '../components/Spinner';

export default function Toys() {
    const {isAuthenticated, user} = useUserContext();
    const [toys, setToys] = useState([]);
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        if(!isAuthenticated) {
            navigate('/auth/login');
            return;
        }   
        fetchToDb(baseUrl, 'GET', null, 'toys', user)
            .then(data => {
                const transformedData = Object.keys(data).map(key => {
                    return {
                        id: key,
                        ...JSON.parse(data[key])
                    }
                }) 
                setToys(transformedData);
                setLoading(false);
            })
    }, []);
    

    return  ( loading ? (
                <Spinner />
                ) : (
            <>
                {
                isAuthenticated && 
                user.email === 'santa@christmasgifts.com' &&
                <Link to={'./create-toy'}>Create Toy</Link>
                }

                <section>
                    <h2>all Toys</h2>
                    <ul>
                        {toys.map(toy => (
                            <li key={toy.id}>
                                <Link to={`./${toy.id}`} >
                                    <h3>{toy.name}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </>
 ));
};  