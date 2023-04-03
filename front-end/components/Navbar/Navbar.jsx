"use client";
import { useState, useEffect, useRef } from "react";
import { IconButton } from "@material-tailwind/react";
import CredOptions from "./CredOptions";
import MobileOptions from "./MobileOptions";
import SearchInput from "../SearchInput/SearchInput";
 
export default function Example() {

    const [openNav, setOpenNav] = useState(false);
    const [options, setOptions] = useState(false);
    const [mobileOptions, setMobileOptions] = useState(false);
    const containerRef = useRef(null);
    const mobileNavbarRef = useRef(null);
    const profileButton = useRef(null);
    
    useEffect(() => {
        window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    useEffect( () => {
        window.addEventListener("click", handleClickOutsideContainer);
        return () => window.removeEventListener("click", handleClickOutsideContainer);
    }, []);
    
    const handleClickOutsideContainer = (event) => {
        if (containerRef.current && ! containerRef.current.contains(event.target))
            setOptions(false);
        
        if (mobileNavbarRef.current && ! mobileNavbarRef.current.contains(event.target))
            if (profileButton.current && !profileButton.current.contains(event.target))
                setOpenNav(false); // putting another. is should not close the navbar if it is profile icon.
    }
    
    const searchInput = (
        <ul className="mb-4 text-black  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <a href="#" className="flex items-center transition-all duration-300 hover:shadow-md shadow-md rounded-md py-2 px-3">
            Pages
            </a>
            <a href="#" className="flex items-center transition-all duration-300 hover:shadow-md shadow-black/20 rounded-md py-2 px-3">
            Account
            </a>
        
            <a href="#" className="flex items-center transition-all duration-300 hover:shadow-md shadow-black/20 rounded-md py-2 px-3">
            Blocks
            </a>
       
            <a href="#" className="flex items-center transition-all duration-300 shadow-black/20 hover:shadow-md rounded-md py-2 px-3">
            Docs
            </a>
        
        </ul>
    );
    
    return (
        <div className="mx-auto z-[999] fixed left-[50%] translate-x-[-50%]    px-4 lg:px-8 py-2 bg-gray-100 w-full">
        <div className="container relative mx-auto flex items-center justify-evenly">
                
            <div className="flex w-full md:w-1/2 gap-x-5 md:mr-0">
                <code className="text-white hidden md:flex p-2 rounded-md  items-center bg-black/80">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                    <span className="">LazyDevs</span>
                </code>
                <SearchInput />
            </div>

            <svg ref={containerRef} onClick={() => setOptions(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-8 hidden lg:inline-flex cursor-pointer text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
            <IconButton
                variant="text"
                className="ml-auto flex items-center h-6 w-6 text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                ref={mobileNavbarRef}
            >
            {openNav ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            ) : (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
            )}
            </IconButton>
            
        </div>
        
        
        </div>
    );
}