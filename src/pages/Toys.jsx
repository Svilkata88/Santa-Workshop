import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";
import { fetchToDb } from "../../utils/utils";
import { baseUrl } from "../../firebase/firebaseConfig";
import Spinner from '../components/Spinner';
import CreateBtn from '../components/buttons/CreateBtn';

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
                    <h1 className="text-center mb-10 text-lg">Toys</h1>
                    {
                    isAuthenticated && 
                        user.email === 'santa@christmasgifts.com' &&
                            <CreateBtn url='./create-toy'/>
                    }
        
                    <ul className="mt-5 flex flex-wrap gap-3" >
                        {toys.map(toy => (
                            <li key={toy.id}
                                className="
                                    bg-[var(--primary)] dark:bg-[var(--primary-dark)] 
                                    p-3 
                                    rounded-md 
                                    flex flex-col gap-3
                                    w-[170px]
                                    h-[150px]"
                            >
                                <Link to={`./${toy.id}`} >
                                    <h3 className="text-center">{toy.name}</h3>
                                    <p>Cat: {toy.category}</p>
                                    <p>Dis: {toy.description}</p>
                                    <p>Dif: {toy.difficulty}</p>
                                    <p>InS: {toy.inStock}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </>
 ));
};  