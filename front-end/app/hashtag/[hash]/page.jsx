import BlogCard from '@/components/BlogCard/BlogCard'
import { cookies } from 'next/headers'
import React from 'react'


const getPostsWithSameHashTags = async (hashtag) => {
    
    let isAuthenticated

    try {

        const accessToken = cookies().get('accessToken')?.value
        const refreshToken = cookies().get('refreshToken')?.value

        const response = await fetch(`http://localhost:3001/blogRoutes/same_tags_posts?tag=${hashtag}`, 
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
        if (data.data !== "zero") return data.data

        else if (data.data === "zero") return undefined
         
        if (data.redirectTo) {
            isAuthenticated = true
        }
        return data
    } 
    
    catch( e ) {
        console.error("error fetching user profile", e)
    } 
    
    finally {
        if (isAuthenticated) redirect("http://localhost:3000/login")
    }
}
export default async function Page({params}) {
    
    const data = await getPostsWithSameHashTags(params.hash)
    return (
        <>
            
            <div className="max-w- max-w-3xl px-4 mx-auto">
                {
                    data && data.length > 0
                        ? data?.map(blog => <BlogCard tags={blog?.tags} saved={blog?.saved} dateDistance={blog.distance} viewCount={blog.viewCount} clamp="3" width={"f"} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>) : null
                }
            </div>
            
        </>
    )
}
