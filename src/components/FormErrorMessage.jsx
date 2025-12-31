export default function FormErrorMessage({ message }) {
    return (
        <div className="text-yellow-300 dark:text-red-500 text-sm ml-auto mr-auto">
            {message}
        </div>
    );
}