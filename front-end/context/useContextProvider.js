"use client";
import { useContext, createContext, useState} from "react";

export const lazyContext = createContext("");

export const LazyContextProvider = ({children}) => {
    const [profileUrl, setProfileUrl] = useState();
    
    return (
        <lazyContext.Provider 
            value={{profileUrl, setProfileUrl}}>
            {children}
        </lazyContext.Provider>
    );
}

export const useAppContext = () => useContext(lazyContext);