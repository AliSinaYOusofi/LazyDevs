"use client";
import { useContext, createContext, useState} from "react";

export const lazyContext = createContext("");

export const LazyContextProvider = ({children}) => {
    const [profileUrl, setProfileUrl] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [templateContent, setTemplateContent] = useState(undefined)
    const [editTags, setEditTags] = useState(null)
    const[postid, setPostid] = useState(null)

    return (
        <lazyContext.Provider 
            value={
                    {
                        profileUrl, setProfileUrl,
                        templateContent, setTemplateContent,
                        currentUser, setCurrentUser,
                        editTags, setEditTags,
                        postid, setPostid,
                    }
                }
            >
            {children}
        </lazyContext.Provider>
    );
}

export const useAppContext = () => useContext(lazyContext);