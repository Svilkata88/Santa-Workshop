import { Link } from "react-router-dom";

export default function CreateBtn({url}) {
    return (
        <Link to={url} className='ml-10 inline-block'>
            <img src="/plus-btn.svg" alt="plus button" className='h-9'/>
        </Link>
    )
}