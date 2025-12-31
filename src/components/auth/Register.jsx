import AuthForm from './AuthForm'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import toast from 'react-hot-toast';

export default function Register() {
    const navigate = useNavigate();
    const {login} = useUserContext();

    const registerHandler = async (formData)=> {
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            login(result.user)
            toast.success('Registration successful!');
            navigate('/')
        }
        catch(error) {
            toast.error('Registration failed. Please check your credentials and try again.');
            navigate('/auth/register');
        }
    }

    return (
        <div className='h-[calc(100vh-56px)] flex items-center justify-center'>
            <AuthForm title='Register' handler={registerHandler}/>
        </div>
    )
};