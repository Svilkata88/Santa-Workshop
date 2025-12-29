export default function FormErrorMessage({ message }) {
    return (
        <div className="text-red-500 text-sm">
            {message}
        </div>
    );
}