import { useElvesContext } from "../context/elvesContext";
import FormSubmitBtn from "./buttons/FormSubmitBtn"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetchToDb } from "../../utils/utils";
import { baseUrl } from "../../firebase/firebaseConfig";
import { useUserContext } from "../context/userContext";
import toast from "react-hot-toast";

export default function CreateTasks() {
    const navigate = useNavigate();
    const {user} = useUserContext();
    const {elfId} = useParams();
    const {elves, setElves} = useElvesContext();
    const [elf, setElf] = useState({});

    const submitCreateTaskHandler = (formData) => {
        const taskName = formData.get('taskName');
        const description = formData.get('description');

        const oldTasks = elf.tasks ? Object.values(elf.tasks) : [];
        const body = {
            tasks: [...oldTasks, { taskName, description }]
        };
        
        
        fetchToDb(baseUrl, 'PATCH', body, `elves/${elfId}`, user)
            .then(() => {
                toast.success('Task created successfully!');
                setElf(prev => ({ ...prev, ...body }));
                setElves(prevElves => prevElves.map(e => 
                    e.id === elfId ? { ...e, ...body } : e
                ));
                navigate(`/elves/${elfId}/tasks`);
            })
            .catch(err => {
                toast.error('Failed to create the task!');
            });
        
    }

    useEffect(() => {
        const currentElf = elves.find(elf => elf.id === elfId);
        setElf(currentElf);
    }, [elves, elfId]);
    
    return (
        <div className='
                        dark:bg-stone-900 
                        min-h-[calc(100vh-56px)] 
                        p-4 
                        dark:text-white
                        '
        >
            <h2 className='mb-10 mt-10 text-center'>Create Task</h2>

            <form 
                className="
                            flex flex-col gap-4 items-center 
                            bg-[var(--primary)]
                            dark:bg-[var(--primary-dark)] 
                            rounded-lg p-3 w-1/4 ml-auto mr-auto"
                action={submitCreateTaskHandler}
            >
                <input 
                    type="text" 
                    name="taskName" 
                    className='pl-4 py-2 border border-[var(--primary)] rounded-md w-full bg-white dark:text-black'
                    placeholder='task short name'
                />

                <input 
                    type="text" 
                    name="description" 
                    className='pl-4 py-2 border border-[var(--primary)] rounded-md w-full bg-white dark:text-black'
                    placeholder='description'
                />

                <FormSubmitBtn text='Register' />
            </form>

        </div>
    )
}