import AuthForm from './AuthForm'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

export default function Register() {
    const navigate = useNavigate();
    const {login} = useUserContext();

    const registerHandler = async (formData)=> {
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        const result = await createUserWithEmailAndPassword(auth, email, password);

        login(result.user)
        navigate('/')
    }

    return (
        <div className='h-[calc(100vh-56px)] flex items-center justify-center dark:bg-stone-900'>
            <AuthForm title='Register' handler={registerHandler}/>
        </div>
    )
};