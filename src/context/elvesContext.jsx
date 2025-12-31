import { createContext, useContext, useEffect, useState } from "react"
import { fetchToDb } from "../../utils/utils";
import { baseUrl } from "../../firebase/firebaseConfig";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ElvesContext = createContext({
    elves: [],
    setElves: () => {},
    loading: false,
})

export const ElvesProvider = ({ children }) => {
    const navigate = useNavigate();
    const {user} = useUserContext();
    const [elves, setElves] = useState([]);
    const [loading, setLoading] = useState(true);

    const value = {
        elves,
        setElves,
        loading
    }

    useEffect(()=> {
        fetchToDb(baseUrl, 'GET', null, 'elves', user)
            .then(data => {
                    if (!data) {
                    toast.error('No elves found.');
                    setLoading(false);
                    navigate('./new');
                    return;
                }
                const transformedData = Object.keys(data)
                    .map(key => {
                        return {
                            id: key,
                            ...data[key]
                        }
                    }) 
                setElves(transformedData);
                setLoading(false);
            })
    }, [user])

    return (
        <ElvesContext.Provider value={value}>
            {children}
        </ElvesContext.Provider>
    );
}

export const useElvesContext = () => {
    const {elves, setElves, loading} = useContext(ElvesContext);
    return {elves, setElves, loading};
};
