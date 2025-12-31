import { baseUrl } from '../../firebase/firebaseConfig';
import { fetchById } from '../../utils/utils';
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUserContext } from '../context/userContext';
import toast from "react-hot-toast";


export default function ElfTasks() {
    const navigate = useNavigate();
    const {user} = useUserContext();
    const {elfId} = useParams();
    const [elf, setElf] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(()=> {
        fetchById(baseUrl, 'elves', elfId, user )
                .then(elfData => {
                    setElf(elfData);
                    setTasks(elf.tasks ?? [])
                })
                .catch(() => {
                    toast.error('Failed to fetch the elf! Something goes wrong...');
                    navigate('/elves');
                });
    }, [elfId])


    return (
        <div className="dark:bg-stone-900 
                        min-h-[calc(100vh-56px)] 
                        p-4 
                        dark:text-white">
             <h1 className="text-center mb-10 text-lg">Elf tasks</h1>

             <Link to={`./new`} className='ml-10'>
                <img src="/plus-btn.svg" alt="plus button" className='h-9'/>
            </Link>
             
             <div>
                {tasks.map( task => {
                    return (
                        <div>
                            {task}
                        </div>
                    )
                })}
            </div>

        </div>    
    )
};  