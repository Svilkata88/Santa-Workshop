import { useState, useEffect } from 'react'
import FormSubmitBtn from '../components/buttons/FormSubmitBtn';
import { fetchToDb } from '../../utils/utils';
import { baseUrl } from '../../firebase/firebaseConfig';
import { useUserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FormErrorMessage from '../components/FormErrorMessage';
import { validate } from '../../utils/utils';
import { useElvesContext } from "../context/elvesContext";

export default function RegisterElf() {
    const navigate = useNavigate();
    const {user} = useUserContext();
    const [role, setRole] = useState('No Role');
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const {elves, setElves} = useElvesContext();

    const submitElfRegHandler = (formData) => {
        const name = formData.get('elfName');
        const role = formData.get('role');
        const energy = formData.get('energy');
        // const img = formData.get('imgID');

        const body = {
            name,
            role,
            energy,
            tasks: ["__empty__"]
            // img
        }

        try {
            fetchToDb(baseUrl, 'POST', body, 'elves', user)

            setElves(prevElves => prevElves.map(e => ({...e, ...body})));
                
            toast.success(
                <h3>Elf Registered!</h3>
            );
            navigate('/elves');
        }
        catch {
            toast.error(
                <h3>Elf was not registered! Plese try again.</h3>
            );
            navigate('/elves/register');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // validate
        if (!file.type.startsWith("image/")) {
            setError("Only image files are allowed");
            return;
        }

        // validate size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be under 2MB");
            return;
        }

        setError(null);

        // create preview
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);  
        
        //will be implemented cloudinary ( or other filestorage ) where uploaded images to be stored 
    }

    return (
        <div className='
                        dark:bg-stone-900 
                        min-h-[calc(100vh-56px)] 
                        p-4 
                        dark:text-white
                        '
        >
            <h2 className='mb-10 mt-10 text-center'>Register Elves</h2>

            <form 
                className="
                            flex flex-col gap-4 items-center 
                            bg-[var(--primary)]
                            dark:bg-[var(--primary-dark)] 
                            rounded-lg p-3 w-1/4 ml-auto mr-auto"
                action={submitElfRegHandler}
                encType="multipart/form-data"
            >
                <img
                    src={preview || "/elfProfile.png"}
                    alt="upload"
                    className="w-[150px] h-[150px] object-cover rounded-lg"
                />
                <input 
                    type="text" 
                    name="elfName" 
                    className='pl-4 py-2 border border-[var(--primary)] rounded-md w-full bg-white dark:text-black'
                    placeholder='elf name'
                    onBlur={(e) => setError(validate('elfName', e.target.value))}
                />

                <select name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onBlur={(e) => setError(validate('role', e.target.value))}
                    className="select-field w-full"      
                >
                    <option value="">role</option>
                    <option value="toy-maker">Toy Maker</option>
                    <option value="quality-control">Quality Control Elf</option>
                    <option value="packer">Gift Packer</option>
                    <option value="logistics">Logistics Elf</option>
                    <option value="supervisor">Workshop Supervisor</option>
                    <option value="inventory">Inventory Manager</option>
                    <option value="delivery">Delivery Coordinator</option>
                    <option value="designer">Toy designer</option>

                </select>

                <input 
                    type="number" 
                    name="energy" 
                    className='pl-4 py-2 border border-[var(--primary)] rounded-md w-full bg-white dark:text-black'
                    placeholder='elft energy'
                    onBlur={(e) => setError(validate('energy', e.target.value))}
                />

                <div className="cursor-pointer w-8 h-8">
                    <label htmlFor="imgID" className="cursor-pointer">
                        <img src="/upload.png" alt="upload" />
                    </label>

                    <input
                        type="file"
                        id="imgID"
                        name="img"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <FormSubmitBtn text='Register' />

                <FormErrorMessage message={error}/>
            </form>

        </div>
    )
};