import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const data = useContext(UserContext) 
    return data;
}

