import ScreenProfile from '@/components/UserHomePage/ScreenProfile';
import { redirect } from 'next/navigation';
import React from 'react'
import {cookies} from 'next/headers'
import UserHomePage from '@/components/UserHomePage/UserNavigation';

// to be the server component

async function getUserData (user_id)  {
    
    let isAuthenticated

    try {

        const accessToken = cookies().get('accessToken')?.value
        const refreshToken = cookies().get('refreshToken')?.value

        const response = await fetch(`http://localhost:3001/blogRoutes/my_profile?user_id=${user_id}`, 
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

const userBasedFollowing = async (user_id) => {
    
    let isAuthenticated

    try {

        const accessToken = cookies().get('accessToken')?.value
        const refreshToken = cookies().get('refreshToken')?.value

        const response = await fetch(`http://localhost:3001/blogRoutes/get_following?user_id=${user_id}`, 
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

    const userData = await getUserData(params.id)

    return (
        <>
            <ScreenProfile 
                username={userData?.user ? userData.user.username : null}
                work={userData?.user ? userData.user.work : null} 
                profileUrl={userData?.user ? userData.user.profileUrl : null}
                numberOfPosts={userData?.numberOfPosts ? userData.numberOfPosts : null}
                followers={userData?.numberOfFollowers ? userData.numberOfFollowers : null}
                following={userData?.numberOfFollowing ? userData.numberOfFollowing : null}
                follows={userData?.alreadyFollowingTheUser ? true : false}
                author={userData?.user._id ? userData?.user._id : null}
                bio={userData?.user ? userData.user.bio : null}
            />

            <div className="md:ml-12 ml-0 mx-auto">
                <UserHomePage user_id={params.id}/>
            </div>
        </>
    )
}
