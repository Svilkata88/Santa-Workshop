import ThemeButton from '../buttons/ThemeButton';
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

export default function AuthSection() {
    const {isAuthenticated, user} = useUserContext(); 
    return (
        <div className="flex gap-3">
            {isAuthenticated ? 
                <>
                <span>Welcome, {user.email}</span>
                <Link to={'/auth/logout'} className='hover:text-[var(--primary)]'>Logout</Link>
                </>
            : <>
                <Link to={'/auth/login'}>Login</Link>
                <Link to={'/auth/register'}>Register</Link>
                </>
            }
                <ThemeButton />
        </div>
    )
}