import { useUserContext } from "../context/userContext";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useElvesContext } from "../context/elvesContext";

export default function Elves() {
    const {elves, setElves, loading} = useElvesContext();
    const {user} = useUserContext();

    // useEffect(()=> {
    //     fetchToDb(baseUrl, 'GET', null, 'elves', user)
    //         .then(data => {
    //              if (!data) {
    //                 toast.error('No elves found.');
    //                 setLoading(false);
    //                 navigate('./new');
    //                 return;
    //             }
    //             const transformedData = Object.keys(data)
    //                 .map(key => {
    //                     return {
    //                         id: key,
    //                         ...data[key]
    //                     }
    //                 }) 
    //             setElves(transformedData);
    //             setLoading(false);
    //         })
    // }, [elves])

    return (
        loading 
        ?
        <Spinner />
        :
        <div className='dark:bg-stone-900 
                        min-h-[calc(100vh-56px)] 
                        p-4 
                        dark:text-white
                        bg-stone-200
                        '
        >
            <h2 className="text-center">ALL Elves</h2>

            {
                user.email === 'santa@christmasgifts.com' 
                    ? 
                <Link to={'./register'} className='ml-10'>
                    <img src="/plus-btn.svg" alt="plus button" className='h-9 pl-3'/>
                </Link>
                    :
                <div></div>
            }


            <div className="
                flex flex-wrap gap-3 
                p-2
                ml-auto mr-auto"
            >
                {elves.map( elf => {
                    return (                 
                        <Link 
                            key={elf.id}
                            to={`./${elf.id}`}
                            className="
                                    bg-[var(--primary)] dark:bg-[var(--primary-dark)] 
                                    p-3 
                                    rounded-md 
                                    flex flex-col gap-3
                                    w-[170px]
                                    h-[120px]"
                        > 
                            <div className="flex gap-3">
                                <img src="/elf.png" alt="elf" className="h-6" />
                                <h2>{elf.name}</h2>
                            </div>
                            <div className="flex gap-3">
                                <img src="/tools.png" alt="elf" className="h-6" />
                                <h2>{elf.role}</h2>
                            </div>
                            <div className="flex gap-3">
                                <img src="/energy.png" alt="elf" className="h-6" />
                                <h2>{elf.energy}</h2>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div> 
    )
};  