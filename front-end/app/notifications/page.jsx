import FollowingNotificationCard from '@/components/Notification/FollowingNotificationCard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'


const getNotifications = async () => {
    
    let isAuthenticated

    try {

        const accessToken = cookies().get('accessToken')?.value
        const refreshToken = cookies().get('refreshToken')?.value

        const response = await fetch(`http://localhost:3001/blogRoutes/user_notifications`, 
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `refreshToken=${refreshToken};accessToken=${accessToken}`
                },
            }, 
        )
        const data = await response.json()
        if (data.message === "success") return data.data
        
        if (data.redirectTo) {
            isAuthenticated = true
        }
        
        return data
    } 
    
    catch( e ) {
        console.error("error fetching user profile", e)
        return undefined
    } 
    
    finally {
        if (isAuthenticated) redirect("http://localhost:3000/login")
    }
}
export default async function Page() {
    
    const result = await getNotifications()
    console.log(result, 'result')
    if (result === undefined) {
        return (
            <div>

            </div>
        )
    }
    
    return (
        <>
            <h1 className="text-3xl mt-10 text-center"> Notifications </h1>
            {
                result.followersNotification.map(user => <FollowingNotificationCard 
                    imageSource={user.profileUrl} 
                    message={user.message} 
                    id={user._id}
                    notifier_id={user?.notifier_id}
                    date={user?.followedAt}
                    date_difference={user?.date_difference}
                    post_id={user?.post_id}
                    post_date={user?.postedAt}
                    />
                )
            }
        </>
    )
}
