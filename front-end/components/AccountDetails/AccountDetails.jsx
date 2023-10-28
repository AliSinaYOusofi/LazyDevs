"use client"

import { useAppContext } from '@/context/useContextProvider';
import Link from 'next/link'
import React from 'react'

export default function AccountDetails() {

    const {currentUser} = useAppContext()

    return (
        <div className="md:w-[70%] w-full mdd:px-4 mx-auto">
            
            <hr />
            <div className=" min-w-0 break-words bg-white w-full mb-6 rounded-lg mt-16">
            
                <div className="md:px-6 flex items-center justify-center gap-x-2 md:gap-x-10">
        
                    <div className="mt-10">
                        <img alt="" src={currentUser ? currentUser.profileUrl : ""} className="shadow-xl rounded-full md:w-24 md:h-24 h-16 w-16" />
                    </div>
                   
                    <div className="mt-12 flex items-start justify-start">
                        
                        <div>
                            <h3 className="md:text-lg text-sm leading-normal text-blueGray-700">
                                {currentUser ? currentUser.username : "Ali Sina Yousofi"}
                            </h3>

                            <h3 className="md:text-lg text-sm leading-normal mt-0 text-blueGray-400">
                                <span> Joined : {currentUser ? currentUser?.joined?.split("T")[0] : "NA"} </span>
                            </h3>
                        </div>

                        <div className="flex flex-col items-start justify-center ml-10">

                            <div className=" text-blueGray-600 flex md:text-lg text-sm items-center gap-x-1">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                </svg>

                                Work : {currentUser ? currentUser.work === null ? "NA" : currentUser.work   : "NA"}
                            </div>

                            <div className=" md:text-lg text-sm text-blueGray-600 flex items-center gap-x-1 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>

                                Education : {currentUser ? currentUser === null ? "NA" : currentUser.education : "NA"}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="mt-10"/>

                <div className="flex flex-wrap md:text-lg text-sm justify-center items-center mt-4">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                    </span>
                    <p className="text-lg leading-relaxed text-blueGray-700">
                        {currentUser ? currentUser.bio === null ? "empty bio" : currentUser.bio : "empty bio"}
                    </p>
                </div>
            </div>
            <hr />
        </div>
    )
}
