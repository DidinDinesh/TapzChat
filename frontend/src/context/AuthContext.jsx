import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("tapzChat-user")) || null)
    const url = "https://tapzchat.onrender.com"

    return  <AuthContext.Provider value={{authUser, setAuthUser, url}}>
                {children}
            </AuthContext.Provider>
}