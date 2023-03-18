"use client";
import React from 'react'

export default function MoveToTop() {

    const handleMovePage = () => scroll({"behavior": "smooth", top: 0}) 
    return (
        <img
            src="https://cdn-icons-png.flaticon.com/512/892/892692.png"
            alt="arrow"
            className="fixed top-[90%] right-[5%] 
                w-12 h-12 shadow-black/10 p-1 rounded-full shadow-md cursor-pointer
                transition-all duration-300 hover:-translate-y-2
            "
            onClick={handleMovePage}
        />
    )
}
