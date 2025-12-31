import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { fetchById } from "../../utils/utils";
import { baseUrl } from "../../firebase/firebaseConfig";
import { useUserContext } from "../context/userContext";
import toast from "react-hot-toast";


export default function ElfProfile() {
    const {elfId} = useParams();
    const {user} = useUserContext();
    const [elf, setElf] = useState({})
    const navigate = useNavigate();

    useEffect(()=> {
        
        fetchById(baseUrl, 'elves', elfId, user )
            .then(elfData => setElf(elfData))
            .catch(()=>{
                toast.error('Failed to fetch the elf! Something goes wrong...')
                navigate('/elves')
            })

    
    }, [elfId])

    const updateEnergy = () => {
        setElf(prevElf => {
            let currentEnergy = Number(prevElf.energy) + 10;
            if (currentEnergy>100) {
                currentEnergy = 100;
            }
            return {
                ...prevElf,   
                energy: currentEnergy  
            }
        });
    }

    return (
        <div 
            className='
                        dark:bg-stone-900 
                        min-h-[calc(100vh-56px)] 
                        p-4 
                        dark:text-white
                        bg-stone-200
                        '

        >
            <h1 className="text-center mb-10 text-lg">Elf profile</h1>
            <div className="
                    dark:text-white
                    bg-[var(--primary)] dark:bg-[var(--primary-dark)] 
                    p-2
                    rounded-md 
                    flex gap-2
                    w-1/3
                    h-[350px]
                    ml-auto mr-auto"
            >
                <div className="w-1/2 flex flex-col gap-3 relative h-full">
                    {/* will be implemented loading the img from filestorage */}
                    <img
                        src={"/elfProfile.png"}
                        // src={"/elfProfile.png"} elf.img?? when filestorage is set
                        alt="upload"
                        className="w-[150px] h-[150px] object-cover rounded-lg ml-auto mr-auto"
                    />
                    <div className="flex gap-3 w-[150px] ml-auto mr-auto">
                        <p className="w-1/3">Name: </p>
                        <p>{elf.name}</p>
                    </div>
                    <div className="flex gap-3 w-[150px] ml-auto mr-auto">
                        <p className="w-1/3">Role: </p>
                        <p>{elf.role}</p>
                    </div>
                    <div className="flex gap-3 w-[150px] ml-auto mr-auto">
                        <p className="w-1/3">Energy: </p>
                        <p>{elf.energy}</p>
                    </div>
                    <button 
                        className="cursor-pointer w-10 h-10 absolute bottom-1 left-1/2 -translate-x-1/2 hover:opacity-80"
                        onClick={() => updateEnergy()}
                    >
                        <img src="/boost.png" alt="boost" />
                    </button>
                </div>
                <div className="w-1/2 h-full border-l boder-l-white p-5 relative">
                    <h2 className="text-center">Info</h2>
                    <p>Short info about every kind of elf in the Santa's workshop which will be implemented soon.</p>
                    <Link
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 flex items-center align-center hover:text-amber-300"
                        to='./tasks' 
                    >
                        <p className="text-xxl leanding-1 mr-1">Tasks</p>
                        <img src="/arrow-right.png" alt="go to tasks" />
                    </Link>
                </div>            
            </div>
        </div>
       
        
    )
};  