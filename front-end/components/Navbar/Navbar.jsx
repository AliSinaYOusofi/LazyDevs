"use client";
import { useState, useEffect, useRef } from "react";
import SearchInput from "../SearchInput/SearchInput";
import Sidebar from "./Sidebar";
import { useAppContext } from "@/context/useContextProvider";
import Buttons from "../LoginSignupButtons/Buttons";
import Avatar from "../LoggedInComponents/Avatar/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
 
export default function Example() {

    const newUser = useCurrentUser()
    const {currentUser} = useAppContext(); 
    const [searchInputs, setSearchInputs] = useState(false);
    const [sidebar, setSidebar] = useState(true);
    const containerRef = useRef(null);
    const openCloseButtonRef = useRef(null);

    useEffect( () => {
        window.addEventListener("click", handleClickOutsideContainer);
        return () => window.removeEventListener("click", handleClickOutsideContainer);
    }, []);

    useEffect( () => {
        const handleResize = () => setSidebar(true);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const handleClickOutsideContainer = (event) => {
        if (containerRef.current && ! containerRef.current.contains(event.target)) {
            if (openCloseButtonRef.current && !openCloseButtonRef.current.contains(event.target)) {
                setSidebar(true);
            }
        }
    }
    
    return (
        <>
            <div id="nav" className="mx-auto z-[99]      px-4 lg:px-8 py-2 bg-white  mt-2 w-full md:w-[90%] md:py-3 rounded-md">
                <div className="container relative mx-auto flex items-center justify-between">    
                    <div className="flex items-center w-full md:w-1/2 gap-x-5 md:mr-0">
                        <div ref={openCloseButtonRef} className="idden  inline cursor-pointer transition-all duration-300" onClick={() => setSidebar(prev => !prev)}>
                           {
                                sidebar
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-9 md:h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-9 md:h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            }
                        </div>

                        <code className="text-white flex p-1 rounded-md  items-center bg-black/80">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                            <span className=""></span>
                        </code>
                        

                        <div className="hidden md:flex">
                            <SearchInput />
                        </div>
                    </div>
                    
                    <div className="flex items-center relative">
                        
                        <svg onClick={() => setSearchInputs(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        {
                            currentUser ? <Avatar profileUrl={currentUser.profileUrl}/> : <Buttons />
                        }
                    </div>

                </div>
                <div className="mt-3 md:hidden">
                    {
                        searchInputs
                        ? <SearchInput />
                        : null
                    }
                </div>
            </div>
            <div ref={containerRef}>
                {<Sidebar setTriggerFunction={setSidebar} sidebar={sidebar}/> }
            </div>
        </>
    );
}