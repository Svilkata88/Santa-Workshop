import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function Navigation() {
     
    return (
        <nav className="flex gap-4 items-center justify-between">
            <div className="flex gap-3">
                <Link to={'/'} className="hover:text-lime-300 dark:hover:text-[var(--primary)]">Home</Link>
                <Link to={'/toys'} className="hover:text-lime-300 dark:hover:text-[var(--primary)]">Toys</Link>
                <Link to={'/orders'} className="hover:text-lime-300 dark:hover:text-[var(--primary)]">Orders</Link>
                <Link to={'/elves'} className="hover:text-lime-300 dark:hover:text-[var(--primary)]">Elves</Link>
            </div>
        </nav>
    )
};