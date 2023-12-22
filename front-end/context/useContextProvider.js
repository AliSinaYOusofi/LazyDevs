"use client";
import { useContext, createContext, useState} from "react";

export const lazyContext = createContext("");

export const LazyContextProvider = ({children}) => {
    
    // for logged in user
    const [profileUrl, setProfileUrl] = useState();
    const [currentUser, setCurrentUser] = useState();
    
    // for editing posts
    const [templateContent, setTemplateContent] = useState(undefined)
    const [editTags, setEditTags] = useState(null)
    const[postid, setPostid] = useState(null)

    // for refetching comments after deletion or update
    // previously used: location.reload()
    // now changing the get_post_comments route to update the comments
    const [refechCommentsAfterCrud, setRefetchCommentsAfterCrud] = useState(false)
    return (
        <lazyContext.Provider 
            value={
                    {
                        profileUrl, setProfileUrl,
                        templateContent, setTemplateContent,
                        currentUser, setCurrentUser,
                        editTags, setEditTags,
                        postid, setPostid,
                        refechCommentsAfterCrud, setRefetchCommentsAfterCrud
                    }
                }
            >
            {children}
        </lazyContext.Provider>
    );
}

export const useAppContext = () => useContext(lazyContext);