"use client"

import { useState } from 'react'
import React from 'react'

export default function ScreenProfile({username, work, followers, following, numberOfPosts, profileUrl}) {

    // the design from dribble
    const [alreadyFollows, setAlreadyFollows] = useState()
    const [spinner, setSpinner] = useState(false);

    const handleFollowButton = () => {}
    return (
        <div className="h-screen bg-white rounded-md mt-10 flex flex-row w-[90%] mx-auto items-center  justify-evenly bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-indigo-200">
            
            <div>
                <img src={profileUrl} alt="" className="w-full h-full object-cover"/>
            </div>

            <div className="h-full flex flex-col items-center justify-center flex-wrap gap-y-20">

                <div className="w-full text-center">
                    <h1 className="text-6xl tracking-widest font-bold"> {username}</h1>
                    <p className="text-2xl text-gray-800">{work}</p>
                </div>

                <div className="flex items-center justify-center gap-x-10">

                    <div className="text-center text-xl">
                        <h1>Followers</h1>
                        {followers}
                    </div>

                    <div className="text-center text-xl">
                        <h1>Following</h1>
                        {following}
                    </div>

                    <div className="text-center text-xl">
                        <h1> Posts</h1>
                        <span className="">{numberOfPosts}</span>
                    </div>  
                </div>
                <button 
                            type="button" 
                            className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900" 
                            onClick={handleFollowButton}
                            disabled={spinner || !username}
                            >
                            {
                                alreadyFollows
                                ? "Unfollow"
                                : "Follow"
                            }
                            {
                                spinner 
                                ?
                                <div className="border-t-transparent border-solid animate-spin  rounded-full border-white border-2 h-6 w-6"></div>
                                : null
                            }
                        </button>
            </div>
            
        </div>
    )
}
