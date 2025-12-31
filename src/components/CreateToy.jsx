
import { baseUrl } from '../../firebase/firebaseConfig';
import { useUserContext } from '../context/userContext';
import { fetchToDb } from '../../utils/utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CreateBtn from './buttons/CreateBtn';
import FormSubmitBtn from './buttons/FormSubmitBtn';


export default function CreateToy() {
    const { user } = useUserContext();
    const navigate = useNavigate();


    const createToyHandler = (formData) => {

        const name = formData.get('name');
        const category = formData.get('category');
        const difficulty = formData.get('difficulty');
        const inStock = formData.get('inStock');
        const description = formData.get('description');

        const body = { name, category, difficulty, inStock, description };  

        fetchToDb(baseUrl, 'POST', body, 'toys', user);
        toast.success(`1 Toy ${name} created successfully!`);
        navigate('/toys');
    };

    return (
        <div className='
                        dark:bg-stone-900 
                        min-h-[calc(100vh-56px)] 
                        p-4 
                        dark:text-white
                        bg-stone-200
                        '
        >
            <h1 className='pb-20 text-xl text-center'>Create Toy</h1>
            <form action={createToyHandler} className="flex flex-col gap-4 items-center bg-[var(--primary)] dark:bg-[var(--primary-dark)] w-1/3 h-[400px] p-10 ml-auto mr-auto text-black rounded-md">
                <input name="name" type="text" placeholder="toy name" className='bg-stone-200 rounded-md p-2'/>
                <input name="category" type="text" placeholder="category" className='bg-stone-200 rounded-md p-2'/>
                <input name="difficulty" type="text" placeholder="difficulty" className='bg-stone-200 rounded-md p-2'/>
                <input name="inStock" type="text" placeholder="inStock" className='bg-stone-200 rounded-md p-2'/>
                <input name="description" type="text" placeholder="Toy Description" className='bg-stone-200 rounded-md p-2'/>
                <FormSubmitBtn text='Create' />
            </form>
        </div>
    )
}
