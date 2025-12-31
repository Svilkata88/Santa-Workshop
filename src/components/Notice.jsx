export default function Notice({message}) {
    return (
        <div className="h-40 w-50 bg-black opacity-80 rounded-md p-3 shadow-[0_0_8px_rgb(231,221,221))]">
            {message}
        </div>
    )
}