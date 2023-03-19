"use client";
import { useState, useEffect, useRef } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import CredOptions from "./CredOptions";
import MobileOptions from "./MobileOptions";
 
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
    
    const navList = (
        <ul className="mb-4  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <a href="#" className="flex items-center transition-all duration-300 hover:shadow-md shadow-md rounded-md py-2 px-3">
            Pages
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <a href="#" className="flex items-center transition-all duration-300 hover:shadow-md shadow-black/20 rounded-md py-2 px-3">
            Account
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <a href="#" className="flex items-center transition-all duration-300 hover:shadow-md shadow-black/20 rounded-md py-2 px-3">
            Blocks
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <a href="#" className="flex items-center transition-all duration-300 shadow-black/20 hover:shadow-md rounded-md py-2 px-3">
            Docs
            </a>
        </Typography>
        </ul>
    );
    
    return (
        <Navbar className="mx-auto z-[999] fixed left-[50%] translate-x-[-50%] w-[90%] max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 mt-2 md:rounded-full rounded-[0.3rem]">
        <div className="container relative mx-auto flex items-center justify-between text-blue-gray-900 my-auto">
            <Typography
            as="a"
            href="#"
            variant="small"
            className="mr-4 items-center cursor-pointer py-1.5 font-normal flex shadow-black/20 shadow-md p-2 rounded-full hover:animate-pulse"
            >
                <code className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                </code>
                <span className="text-blue-200">LazyDevs</span>
                
            </Typography>
            <div className="hidden lg:block">{navList}</div>

            <svg ref={containerRef} onClick={() => setOptions(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden lg:inline-flex cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
          
            <IconButton
            variant="text"
            className="ml-auto flex items-center h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
        
        <div >
            {
                options ? <CredOptions /> : null
            }
        </div>
        <MobileNav open={openNav} >
            <div className="container mx-auto">
            {navList}
            <div className="relative flex w-full" >
                
                <svg ref={profileButton}  onClick={() => setMobileOptions(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-black ml-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                
                {
                    mobileOptions ? <MobileOptions /> : null
                }
            </div>
            </div>
        </MobileNav>
        </Navbar>
    );
}