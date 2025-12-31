import AuthForm from './AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { useNavigate  } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();
    const {login} = useUserContext();

    const signInHandler = async (formData)=> {

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
    
            login(result.user);
            toast.success('Login successful!');
            navigate('/');
        }
        catch(error) {
            toast.error('Login failed. Please check your credentials and try again.');
            navigate('/auth/login');
        }
    }

    return (
        <div className='h-[calc(100vh-56px)] flex items-center justify-center dark:bg-stone-900'>
            <AuthForm title='Login' handler={signInHandler}/>   
        </div>
    )
};  