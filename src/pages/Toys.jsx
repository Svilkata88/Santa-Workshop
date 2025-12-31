import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";
import { fetchToDb } from "../../utils/utils";
import { baseUrl } from "../../firebase/firebaseConfig";
import Spinner from '../components/Spinner';
import CreateBtn from '../components/buttons/CreateBtn';

export default function Toys() {
    const {isAuthenticated, user} = useUserContext();
    const [allToys, setAllToys] = useState([]);
    const [toys, setToys] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [inStockFilter, setInstockFilter] = useState(false);
    const [sorted, setSorted] = useState('');
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login');
            return;
        }

        fetchToDb(baseUrl, 'GET', null, 'toys', user)
            .then(data => {
                const transformedData = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));

            setAllToys(transformedData);
            setToys(transformedData);

            const uniqueCategories = [
                ...new Set(transformedData.map(t => t.category))
            ];
            setCategories(uniqueCategories);

            setLoading(false);
        });
    }, [isAuthenticated]);

    useEffect(() => {
        let filtered = allToys;

        if (categoryFilter) {
            filtered = filtered.filter(
                toy => toy.category === categoryFilter
            );
        }

        if (inStockFilter) {
            filtered = filtered.filter(
                toy => 
                inStockFilter ? toy.inStock > 0 : toys
            );
        }

        setToys(filtered);
    }, [categoryFilter, inStockFilter]);

    useEffect(() => {
        if (!sorted) return;

        setToys(prevToys => {
            const copy = [...prevToys];

            copy.sort((a, b) => {
                if (sorted === 'name') {
                    return a.name.localeCompare(b.name);
                }
                if (sorted === 'difficulty') {
                    return a.difficulty.localeCompare(b.difficulty);
                }
                return 0;
            });

            return copy;
        });
    }, [sorted]);

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

                    <div className="flex gap-5 mt-5">
                        <select name="categoryF" className="select-field"
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >   
                            <option value=''>category filter</option>
                            {categories.map(category=> {
                                return <option value={category} key={category}>{category}</option>
                            })}
                        </select>
                        <label className="inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                onChange={(e) => setInstockFilter(e.target.checked)} 
                                checked={inStockFilter}/>
                            <div className="relative w-9 h-5 bg-gray-300 rounded-full peer dark:bg-gray-300 peer-focus:ring-3 peer-focus:ring-red-400 dark:peer-focus:ring-teal-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-300 dark:peer-checked:bg-teal-400"></div>
                            <span className="select-none ms-3 text-sm font-medium text-heading">In stock only</span>
                        </label>
                        <select name="sorted" className="select-field"
                            onChange={(e) => setSorted(e.target.value)}
                        >   
                            <option value=''>sort</option>
                            <option value='name'>name</option>
                            <option value='difficulty'>difficulty</option>
                        </select>
                    </div>
        
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