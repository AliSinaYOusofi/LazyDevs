"use client";
import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(isInitialVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(isInitialVisible);
    const containerRef = useRef(null);

    const handleClickOutsideContainer = (event) => {
        if (containerRef.current && ! containerRef.current.contains(event.target))
            setIsComponentVisible(false);
    }

    useEffect( () => {
        document.addEventListener("click", handleClickOutsideContainer, true);
        return () => document.removeEventListener("click", handleClickOutsideContainer, true);
    }, []);

    return {containerRef, isComponentVisible, setIsComponentVisible};
}