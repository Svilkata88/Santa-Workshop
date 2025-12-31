import ThemeButton from "../components/buttons/ThemeButton";

export default function Header({children}) {
    return (
        <div className="relative flex justify-between items-center px-4 py-3 bg-[var(--primary)] dark:bg-[var(--primary-dark)] dark:text-white transition">
            {children}
        </div>
    )
};