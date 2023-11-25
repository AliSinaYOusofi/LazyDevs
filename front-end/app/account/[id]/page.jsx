import ScreenProfile from '@/components/UserHomePage/ScreenProfile';
import { redirect } from 'next/navigation';
import React from 'react'
import {cookies} from 'next/headers'

// to be the server component

async function getUserData ()  {
    
    let isAuthenticated

    try {

        const accessToken = cookies().get('accessToken')?.value
        const refreshToken = cookies().get('refreshToken')?.value

        

        const response = await fetch(`http://localhost:3001/blogRoutes/my_profile`, 
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `refreshToken=${refreshToken};accessToken=${accessToken}`
                }
            }, 
        )
        const data = await response.json()
        console.log("data", data)
        if (data.data !== "zero") return data.data

        else if (data.data === "zero") return undefined
         
        if (data.redirectTo) {
            isAuthenticated = true
        }
        return data
    } catch( e ) {
        console.error("error fetching user profile", e)
    } finally {
        if (isAuthenticated) redirect("http://localhost:3000/login")
    }
}

export default async function Page({params}) {

    const userData = await getUserData()

    console.log("userData", userData)
    return (
        <>
            <ScreenProfile 
                username={userData.user.username}
                work={userData.user.work}
                profileUrl={userData.user.profileUrl}
                numberOfPosts={userData.numberOfPosts}
                followers={userData.numberOfFollowers}
                following={userData.numberOfFollowing}
            />
        </>
    )
}
