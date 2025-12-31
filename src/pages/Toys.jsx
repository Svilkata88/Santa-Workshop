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
                        ...data[key]
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
                <section  className="
                        dark:bg-stone-900 
                        dark:text-white 
                        min-h-[calc(100vh-56px)]
                        p-4
                ">
                    {
                    isAuthenticated && 
                        user.email === 'santa@christmasgifts.com' &&
                            <Link to={'./create-toy'} className="button">
                                Create Toy
                            </Link>
                    }
                    <h2 className="mt-3">all Toys</h2>
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