import React from 'react'
import HandleFeed from './HandleFeeds'


import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const checkUserStatus = async (hashtag) => {
    
    let isAuthenticated

    try {

        const accessToken = cookies().get('accessToken')?.value
        const refreshToken = cookies().get('refreshToken')?.value

        const response = await fetch(`http://localhost:3001/user/check`, 
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

        else if (data.data?.length === 0) return undefined
        
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
  

  /* 
    adding the top, latest and relevant options
    when clicked on when one of them then the blogs should also.
  */

  await checkUserStatus()
  return (
    <>
      <HandleFeed />
    </>
  )
}
