"use client"
import { useAppContext } from '@/context/useContextProvider'
import { notification_to_invoke } from '@/functions/notification_to_invoke'
import Link from 'next/link'
import { useRouter} from 'next/navigation'
import React, { useState} from 'react'
import { toast } from 'react-toastify'

export default function FollowingNotificationCard({imageSource, message, id, isRead, notifier_id, date, date_difference, post_id, post_date}) {

    const [spinner, setSpinner] = useState(false)
    const { setRefreshNotificationAfterRead } = useAppContext()
    const router = useRouter() 

    const markNotificationRead = async () => {
        
        try {
            setSpinner(true)
            let whichNotificationToInvode = notification_to_invoke(message)
        
            const response = await fetch(`http://localhost:3001/blogRoutes/mark_notification?notification_id=${encodeURIComponent(id)}&post_id=${post_id}&notification_type=${encodeURIComponent(whichNotificationToInvode)}`, {
                method: "GET",
                credentials: "include",
            })

            const json = await response.json()
            
            if (json.message === "marked") {
               setRefreshNotificationAfterRead( prev => ! prev)
            } else {
                toast.error("Operation failed !!")
            }
        }
        catch( e ) {
            console.error(e, " error while making notification read")
        } finally {
            setSpinner(false)
        }
    }

    return (
        
        <div 
            className={`${!isRead ? "border-l-4 border-black" : ""} max-w-2xl px-8 py-4 mx-auto bg-white transition-all duration-100  from-pink-500 via-red-500 to-yellow-500  rounded-lg mt-4 flex items-center justify-between`}>
            
            <Link href={{pathname: `/account/${notifier_id}`}} className="flex items-center gap-x-2 hover:underline">
                

                <img
                    src={imageSource}
                    alt="profile"
                    className=" w-16 h-16 rounded-full object-cover hover:scale-[2] transition-all duration-300"
                />

                <div>
                    
                    <p>{message} </p>
                    
                    <p className="flex items-center text-sm">
                        {
                            date 
                            ? 
                            date.split("T")[0] 
                            : 
                            null
                        }

                        {
                            post_date
                            ?
                            post_date?.split("T")[0]
                            : null
                        }
                        <span className="text-xs">({date_difference ? ` ${date_difference}` : "NA"}) </span>
                    </p>
                </div>
                
            </Link>

            {
                isRead
                ? null
                : 
                <button
                    type="button"
                    onClick={markNotificationRead}
                    disabled={spinner}
                    className="p-1 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    {
                        spinner
                        ?
                        <div className="border-t-transparent border-solid animate-spin  rounded-full border-white border-2 h-5 w-5"></div>
                        : null
                    }
                </button>
            }

            {
                post_id
                ?
                <Link
                    href={{ pathname: `/view_post`, query: {post: post_id}}}
                    type="button"
                    className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-100 text-black transition-all hover:bg-gray-300"
                >
                    Check
                </Link>
                : null
            }
        </div>
    )
}
