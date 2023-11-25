"use client"

import { useAppContext } from '@/context/useContextProvider';
import { useState, useEffect } from 'react'
import React from 'react'

export default function ScreenProfile({username, work, followers, following, numberOfPosts, profileUrl, follows, author, bio}) {

    // the design from dribble
    const [alreadyFollows, setAlreadyFollows] = useState()
    const [spinner, setSpinner] = useState(false);
    const {currentUser} = useAppContext()

    useEffect( () => {
        // check if the user follows
        setAlreadyFollows(follows)
    }, [])

    const handleFollowButton = async () => {
        
        setSpinner(true)
        
        try {

            
            const response = await fetch(`http://localhost:3001/blogRoutes/follow?to_followed_user=${author}`, 
                {
                    method: "GET",
                    credentials: "include",
                }   
            );
            const data = await response.json()
            console.log(data)

            if (data.message === "following") {
                setAlreadyFollows(true)
            } else if (data.message === "unfollowing") {
                setAlreadyFollows(false)
            }
        }
        catch(e) {
            console.error("Error!! following a user", e)
        }
        finally {
            setSpinner(false)
        }
    }
    
    return (
        <div className="h-full rounded-md mt-10 flex md:flex-row flex-col w-[80%] mx-auto items-center  justify-evenly bg-[#F4F5FB] py-10">
            
            <div className="px-5 md:w-1/2 md:h-1/2">
                <img src={profileUrl} alt="" className="object-cover h-1/3  p-2 rounded-full border-2 border-white"/>
                <p className='text-gray-700 mt-4'>
                    {bio || "Empty Bio"}
                </p>
            </div>

            <div className="h-full flex flex-col items-center justify-center flex-wrap gap-y-10 md:mt-0 mt-4">

                <div className="w-full text-center">
                    <h1 className="text-6xl tracking-widest font-bold text-gray-800"> {username}</h1>
                    <p className="text-2xl italic text-gray-700">{work || "NA"}</p>
                </div>

                <div className="flex items-center justify-center gap-x-10">

                    <div className="text-center text-xl text-gray-700">
                        <h1>Followers</h1>
                        {followers || 0}
                    </div>

                    <div className="text-center text-xl text-gray-700">
                        <h1>Following</h1>
                        {following || 0}
                    </div>

                    <div className="text-center text-xl text-gray-700">
                        <h1> Posts</h1>
                        <span className="">{numberOfPosts || 0}</span>
                    </div>  
                </div>

                <div>

                    {
                        currentUser?._id === author ?
                        null:
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
                    }

                    <button
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-50 text-black ml-10" 
                    >
                        More
                    </button>
                </div>
            </div>
            
        </div>
    )
}
