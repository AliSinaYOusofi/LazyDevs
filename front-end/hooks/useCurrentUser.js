import { useAppContext } from "@/context/useContextProvider";
import { useEffect, useState } from "react";

function useCurrentUser() {
    const {currentUser, setCurrentUser} = useAppContext()

    useEffect(() => {
        if (document.visibilityState === "visible") {
            if (localStorage.getItem("currentUser")) {
                setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
            }
        }
    }, []);

    return currentUser;
}

export default useCurrentUser;