

export default function AuthForm({title, handler}) {

    return (
        <div className="bg-[var(--primary)] 
                        text-black 
                        dark:bg-[var(--primary-dark)] 
                        dark:text-white 
                        w-[300px]
                        p-2 
                        rounded-xl
                        ml-auto mr-auto
        ">
            <h2 className="mb-4 text-center text-lg">{title}</h2>
            <form action={handler} className="flex flex-col gap-4 items-center">
                <input name="username" placeholder="username" type="text" className="bg-white rounded-md w-[220px] pl-2 text-black"/>
                <input name="email" placeholder="email" type="text" className="bg-white rounded-md w-[220px] pl-2 text-black"/>
                <input name="password" placeholder="password" type="password" className="bg-white rounded-md w-[220px] pl-2 text-black"/>
                <button type="submit" className="bg-zinc-400 cursor-pointer w-fit px-3 py-1 rounded-md mb-2">{title}</button>
            </form>
        </div>
    );
}