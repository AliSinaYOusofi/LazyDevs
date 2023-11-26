"use client";
import React, { useEffect, useRef } from 'react'

export default function MoveToTop() {

    const iconRef = useRef(null);
    const handleMovePage = () => scroll({"behavior": "smooth", top: 0})
    // should only display if we move down

    const scrollHandler =  () => {
        
        if (Math.round(window.scrollY) >= 200) {
            if (iconRef.current) {
                iconRef.current.style.display = "flex"
                iconRef.current.style.position = "fixed"
            }
        }
        else {
            if (iconRef.current) iconRef.current.style.display = "none"
        }
    }
    useEffect( () => {
        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    return (
        <svg
            ref={iconRef}
            onClick={handleMovePage} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-10 h-10 top-[90%] right-[5%] hidden shadow-sm shadow-black/50 cursor-pointer rounded-full p-2"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    )
}
