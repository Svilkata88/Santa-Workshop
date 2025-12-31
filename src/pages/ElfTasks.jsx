import { baseUrl } from '../../firebase/firebaseConfig';
import { fetchById } from '../../utils/utils';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from '../context/userContext';
import toast from "react-hot-toast";
import CreateBtn from '../components/buttons/CreateBtn';


export default function ElfTasks() {
    const navigate = useNavigate();
    const {user} = useUserContext();
    const {elfId} = useParams();
    const [elf, setElf] = useState({});

    useEffect(()=> {
        fetchById(baseUrl, 'elves', elfId, user )
                .then(elfData => {
                    // remove the 1st empty task
                    elfData.tasks = elfData.tasks.slice(1);
                    setElf(elfData);
                })
                .catch(() => {
                    toast.error('Failed to fetch the elf! Something goes wrong...');
                    navigate('/elves');
                });
    }, [elfId])


    return (
        <div className="dark:bg-stone-900 
                        min-h-[calc(100vh-72px)]  
                        p-4 
                        dark:text-white
                        bg-stone-200">
             <h1 className="text-center mb-10 text-lg">Elf tasks</h1>

             <CreateBtn url='./new' />
             
             <div>
                {elf?.tasks && Object.values(elf.tasks).map((task, index) => (
                    <div key={index} className="
                            bg-[var(--primary)] dark:bg-[var(--primary-dark)] 
                            p-3 mt-5 ml-10
                            rounded-md 
                            flex gap-3 items-center
                            w-1/2
                            h-[50px]"
                    >
                        <p>{task.taskName}</p>
                        <p className='border-l border-white pl-3'>{task.description}</p>
                    </div>
                ))}
            </div>

        </div>    
    )
};  