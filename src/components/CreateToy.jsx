
import { baseUrl } from '../../firebase/firebaseConfig';
import { useUserContext } from '../context/userContext';
import { fetchToDb } from '../../utils/utils';
import toast from 'react-hot-toast';


export default function CreateToy() {
    const { user } = useUserContext();

    const createToyHandler = (formData) => {

        const name = formData.get('name');
        const category = formData.get('category');
        const difficulty = formData.get('difficulty');
        const inStock = formData.get('inStock');
        const description = formData.get('description');

        const body = JSON.stringify({ name, category, difficulty, inStock, description });  

        fetchToDb(baseUrl, 'POST', body, 'toys', user);
        toast.success(`1 Toy ${name} created successfully!`);
    };

    return (
        <div>
            <h1>Create Toy Page</h1>
            <form action={createToyHandler} className="flex flex-col gap-4 items-center">
                <input name="name" type="text" placeholder="toy name" />
                <input name="category" type="text" placeholder="category" />
                <input name="difficulty" type="text" placeholder="difficulty" />
                <input name="inStock" type="text" placeholder="inStock" />
                <input name="description" type="text" placeholder="Toy Description" />
                <button type="submit" className="cursor-pointer">Create Toy</button>
            </form>
        </div>
    )
}
