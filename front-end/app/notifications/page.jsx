"use client"
import FollowingNotificationCard from '@/components/Notification/FollowingNotificationCard'
import { redirect } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import SortNotifications from './DisplayNotifications'
import { useAppContext } from '@/context/useContextProvider'

export default function Page() {
    
    const [notificationsList, setNotificationsList] = useState(undefined)
    const [errorMessage, setErrorMessages] = useState('')
    const [retryFetchTopBlogs, setRetryFetchTopBlogs] = useState(false)
    const { refreshNotificationsAfterRead } = useAppContext()
    useEffect( () => {
        
        const fetchNotifications = async () => {
            try {
    
                const response = await fetch(`http://localhost:3001/blogRoutes/user_notifications`, 
                    {
                        method: "GET",
                        credentials: "include",
                    }
                )
                const data = await response.json()
                    
                if (data.message === "success") {
                    setNotificationsList(data.followersNotification)
                }

                else if (data.message === "failed") {
                    setErrorMessages("server error while fethcing posts")
                }
                
                if (data.redirectTo) {
                    redirect(data.redirectTo)
                }
            } 
            
            catch( e ) {
                console.error("error fetching user profile", e)
                setErrorMessages("server error while fethcing posts")
            } 
        }
        fetchNotifications()
    }, [retryFetchTopBlogs, refreshNotificationsAfterRead])

    const handleRetryFetchTopBlogs = () => {
        setRetryFetchTopBlogs(prev => ! prev)
        setErrorMessages("")
    }

    if (! notificationsList?.length) return <div className="flex h-screen items-center justify-center mx-auto right-[50%] mt-[4rem]">
        {
          errorMessage ? <div className=" w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
                
                <div className="shadow-white shadow-sm p-2 -translate-y-[30%]  rounded-md  w-screen flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                
                    <button 
                        type="button" 
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                        onClick={handleRetryFetchTopBlogs}   
                    >
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            className='w-7 h-7'
                            >
                            <path d="M256 48C141.31 48 48 141.32 48 256c0 114.86 93.14 208 208 208 114.69 0 208-93.31 208-208 0-114.87-93.13-208-208-208zm94 219a94 94 0 11-94-94h4.21l-24-24L256 129.2l59.8 59.8-59.8 59.8-19.8-19.8 27.92-27.92c-2.4-.08-5.12-.08-8.12-.08a66 66 0 1066 66v-14h28z" />
                        </svg>
                        Retry
                    </button>
                </div>
            </div>
          : <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>
        }
    </div>
    
    else if (notificationsList.length === 0) {
        return (
            <div className="mt-10 text-center">
                <h1> You have no notifications </h1>
            </div>
        )
    }

    return (
        <>
            <h1 className="text-3xl mt-10 text-center"> Notifications : {notificationsList?.length} </h1>
            {
            
                errorMessage ?
                
                null :
                
                <div className={`flex items-center justify-start mt-4 gap-x-4 md:ml-0 ml-2`}>
                
                    <SortNotifications setSortByCriteria={setNotificationsList} />
                </div>
            }
            {
                notificationsList.map(user => <FollowingNotificationCard 
                    imageSource={user.profileUrl} 
                    message={user.message} 
                    id={user._id}
                    key={user?._id}
                    notifier_id={user?.notifier_id}
                    date={user?.followedAt}
                    date_difference={user?.date_difference}
                    post_id={user?.post_id}
                    post_date={user?.postedAt}
                    isRead={user?.isRead}
                    
                    />
                )
            }
        </>
    )
}
