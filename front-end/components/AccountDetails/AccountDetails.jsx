"use client"

import { useAppContext } from '@/context/useContextProvider';
import Link from 'next/link'
import React from 'react'

export default function AccountDetails() {

    const {currentUser} = useAppContext()
    
    console.log(currentUser)

    return (
        <div className="w-[70%] px-4 mx-auto">
            
            <hr />
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg mt-16">
            
                <div className="px-6">
            
                    <div className="flex flex-wrap justify-center">
            
                        <div className="w-full px-4 flex justify-center">
            
                            <div className="relative">
                                <img alt="" src={currentUser ? currentUser.profileUrl : ""} className="shadow-xl rounded-full w-24 h-24" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center mt-12">
                        
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                            {currentUser ? currentUser.username : "NA"}
                        </h3>
                        
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                            Joined: {currentUser ? currentUser.joined.split("T")[0] : "NA"}
                        </div>

                        <div className="mb-2 text-blueGray-600 mt-10">
                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                            Work: {currentUser ? currentUser.work : "NA"}
                        </div>

                        <div className="mb-2 text-blueGray-600">
                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                            Education : {currentUser ? currentUser.education : "NA"}
                        </div>
                    </div>

                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        
                        <div className="flex flex-wrap justify-center">
                        
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                   {currentUser ? currentUser.bio : "empty bio"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}
