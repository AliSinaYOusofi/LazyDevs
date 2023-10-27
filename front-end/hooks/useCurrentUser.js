import { useAppContext } from "@/context/useContextProvider";
import { useLayoutEffect } from "react";

function useCurrentUser() {
    const {currentUser, setCurrentUser} = useAppContext()

    useLayoutEffect(() => {
        
        if (localStorage.getItem("currentUser")) {
            setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        }
        
    }, []);

    return currentUser;
}

export default useCurrentUser;