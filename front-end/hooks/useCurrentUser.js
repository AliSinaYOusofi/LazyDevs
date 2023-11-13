import { useAppContext } from "@/context/useContextProvider";
import { useEffect } from "react";

function useCurrentUser() {
   
    const { currentUser, setCurrentUser } = useAppContext();

    useEffect(() => {
        
        const storedUser = localStorage.getItem("currentUser");

        if (storedUser) {
        
            try {
                const parsedUser = JSON.parse(storedUser);
                setCurrentUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
            }
        }
    }, [setCurrentUser]);

    return currentUser;
}

export default useCurrentUser;
