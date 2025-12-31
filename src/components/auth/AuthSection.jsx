import ThemeButton from '../buttons/ThemeButton';
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

export default function AuthSection() {
    const {isAuthenticated, user} = useUserContext(); 
    return (
        <div className="flex gap-3">
            {isAuthenticated ? 
                <>
                Welcome, <span className='text-green-800 dark:text-[var(--primary)] font-bold'>{user.email}</span>
                <Link to={'/auth/logout'} className='hover:text-lime-300 dark:hover:text-[var(--primary)]'>Logout</Link>
                </>
            : <>
                <Link to={'/auth/login'} className='hover:text-lime-300 dark:hover:text-[var(--primary)]'>Login</Link>
                <Link to={'/auth/register'} className='hover:text-lime-300 dark:hover:text-[var(--primary)]'>Register</Link>
                </>
            }
                <ThemeButton />
        </div>
    )
}