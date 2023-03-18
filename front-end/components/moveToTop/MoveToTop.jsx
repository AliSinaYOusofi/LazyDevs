"use client";
import React, { useEffect, useRef } from 'react'

export default function MoveToTop() {

    const iconRef = useRef(null);
    const handleMovePage = () => scroll({"behavior": "smooth", top: 0})
    // should only display if we move down
    useEffect( () => {
        window.addEventListener("scroll", () => {
            if (Math.round(window.scrollY) >= 200) {
                if (iconRef.current) {
                    iconRef.current.style.display = "flex"
                    iconRef.current.style.position = "fixed"
                }
            }
            else
                iconRef.current.style.display = "none"
        });

        return () => window.removeEventListener("scroll");
    }, []);
    return (
        <img
            src="https://cdn-icons-png.flaticon.com/512/892/892692.png"
            alt="arrow"
            className="hidden top-[90%] right-[5%] 
                w-12 h-12 shadow-black/10 p-1 rounded-full shadow-md cursor-pointer
                transition-all duration-300 hover:-translate-y-2
            "
            onClick={handleMovePage}
            ref={iconRef}
        />
    )
}
