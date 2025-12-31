import { createContext, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

const UserContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            });
            return () => unsubscribe();
    }, []);

    const login = (userData) => setUser(userData);
    const register = (userData) => setUser(userData);
    const logout = () => setUser(null);

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        loading ? <Spinner /> :
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => {
    const data = useContext(UserContext) 
    return data;
}


