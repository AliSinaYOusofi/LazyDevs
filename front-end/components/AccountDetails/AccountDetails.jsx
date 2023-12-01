"use client"

import { useAppContext } from '@/context/useContextProvider';
import React from 'react'

export default function AccountDetails() {

    const {currentUser} = useAppContext()

    return (
        
        <div className="md:px-6 flex flex-col items-center justify-evenly  bg-[#fafafd] p-12">

            
            <div className="flex md:flex-row flex-col md:items-center justify-evenly w-full gap-x-5 gap-y-5">
                
                <div className="">
                    <img 
                        alt="" 
                        src={currentUser ? currentUser.profileUrl : ""} 
                        className="shadow-xl rounded-full object-cover md:w-[25rem] md:h-[25rem] w-[20rem] h-[20rem]" />
                </div>

                <div className="flex flex-col gap-y-3">

                    <div className=" text-gray-600 flex md:text-lg text-sm items-center gap-x-1">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        {currentUser ? currentUser.username : "NA"}
                    </div>

                    <div className="text-gray-600 flex md:text-lg text-sm items-center gap-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>

                        <span> Joined : {currentUser ? currentUser?.joined?.split("T")[0] : "NA"} </span>
                    </div>
                </div>

                <div className="flex flex-col gap-y-3">

                    <div className=" text-gray-600 flex md:text-lg text-sm items-center gap-x-1">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                        </svg>

                        Work : {currentUser ? currentUser.work === null ? "NA" : currentUser.work   : "NA"}
                    </div>

                    <div className="text-gray-600 md:text-lg text-sm text-blueGray-600 flex items-center gap-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>

                        Education : {currentUser ? currentUser.work === null ? "NA" : currentUser.education : "NA"}
                    </div>
                </div>
                
            </div>

            <div className="flex items-start flex-wrap md:text-lg text-sm  mt-4">
                <p className="text-lg leading-relaxed text-gray-600">
                    {currentUser ? currentUser.bio === null ? "empty bio" : currentUser.bio : "empty bio"}
                </p>
            </div>
        </div>
    )
}
