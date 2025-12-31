import { Link } from "react-router-dom";

export default function CreateBtn(url) {
    return (
        <Link to={'./new'} className='ml-10'>
            <img src="/plus-btn.svg" alt="plus button" className='h-9'/>
        </Link>
    )
}