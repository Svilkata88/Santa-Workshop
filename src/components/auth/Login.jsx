import AuthForm from './AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { useNavigate  } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

export default function Login() {
    const navigate = useNavigate();
    const {login} = useUserContext();

    const signInHandler = async (formData)=> {

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        const result = await signInWithEmailAndPassword(auth, email, password);

        login(result.user);
        navigate('/');
    };

    return (
        <div className='h-[calc(100vh-56px)] flex items-center justify-center dark:bg-stone-900'>
            <AuthForm title='Login' handler={signInHandler}/>   
        </div>
    )
};