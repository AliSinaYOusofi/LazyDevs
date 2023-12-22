import React from 'react'
import HandleFeed from './HandleFeeds'


import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const metadata = {
  title: "Newsfeed"
}

const checkUserStatus = async () => {
    
  let isAuthenticated

  try {

      const accessToken = cookies().get('accessToken')?.value
      const refreshToken = cookies().get('refreshToken')?.value

      const response = await fetch('http://localhost:3001/user/check', 
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
  
  return (
    <>
      <HandleFeed />
    </>
  )
}
