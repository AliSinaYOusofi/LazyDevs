import Link from 'next/link'
import React from 'react'
import { useAppContext } from '@/context/useContextProvider'
import { useEffect, useState } from 'react'

export default function UserCard({profile, email, username, date, difference, isFollowing, author}) {

    const [alreadyFollows, setAlreadyFollows] = useState()
    const [spinner, setSpinner] = useState(false);
    
    const {currentUser} = useAppContext()

    useEffect( () => {
        // check if the user follows
        if (isFollowing) setAlreadyFollows(isFollowing)
    }, [isFollowing])

    const handleFollowButton = async () => {

        setSpinner(true)
        try {
            const response = await fetch(`http://localhost:3001/blogRoutes/follow?user_id=${currentUser ? currentUser?._id : null}&to_followed_user=${author}`, 
                {
                    method: "GET",
                    credentials: "include"
                }   
            );
            const data = await response.json()
            console.log(data)

            if (data.message === "following" || data.message === "new") {
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
        <>
            <address className="flex justify-between items-center mb-6 not-italic">
                <div className="inline-flex justify-center mt-4  p-4 items-center mr-3 text-sm text-gray-900">
                    <img className="mr-4 w-16 h-16 rounded-full object-cover shadow-white shadow-lg" src={profile ? profile : "https://stackdiary.com/140x100.png"} alt="" />
                    <div>
                        <p className="text-xl font-bold text-gray-900 flex flex-row items-center justify-start">{username ? username : "username"}
                            
                        </p>
                        <Link href={{ pathname:`/account/${author}`}} className="text-base font-light text-blue-900 hover:underline">{email ? email : "NA"}</Link>
                        <p className="text-base font-light text-gray-900"><time pubdate="true" dateTime="2022-02-08" title="February 8th, 2022"> posted on {date ? date.split("T")[0] : "NA"} <span className="md:text-sm text-xs text-gray-600">({difference})</span> </time></p>
                    </div>
                </div>
                <div>
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
            </address>
        </>
    )
}
