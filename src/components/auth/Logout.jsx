import AuthForm from './AuthForm'
import { auth } from '../../../firebase/firebaseConfig';
import { useNavigate  } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { useEffect } from 'react';

export default function Logout() {
    const navigate = useNavigate();
    const { logout, user} = useUserContext();

    const signOutHandler = async ()=> {
        await signOut(auth);
    };

    useEffect( ()=> {
        signOutHandler()
        logout()
        navigate('/')
    }, []);

    return (
        <>
            
        </>
    )
};