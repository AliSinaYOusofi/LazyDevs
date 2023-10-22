"use client";

import React, {useEffect, useState} from 'react'
import BlogCard from '../BlogCard/BlogCard';
import Link from 'next/link';

export default function PostOfUserBasedId({author}) {

    const [posts, setPosts] = useState([]);
    const [reversed, setReversed] = useState(false)

    console.log(author, 'author of the posts');

    useEffect( () => {
        async function getUserBlogsBasedOnAuthorOfTheUser() {

            if (!author) return alert("no author id provided") 
            try {
                const response = await fetch(`http://localhost:3001/accountRoutes/my_posts/:${author}`, {method: "GET"});
                const data = await response.json()
                setPosts(data.data)
            }catch(e) {
                console.log('error in while getting feeds');
            }
        }

        getUserBlogsBasedOnAuthorOfTheUser()

    }, [author])

    const reversePosts = () => {
        setPosts([...posts].reverse())
        setReversed(prev => ! prev)
    }

    return (
        <div className="w-[70%]">
            
            <div className="">
                <h1 className="text-3xl font-bold"> Your Posts</h1>
                <p> Sorted By: {reversed ? "Most viewed" : "Less Viewed"} </p>
                <div onClick={reversePosts} className="p-2 w-fit ml-4 shadow-black/50 mt-4 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                </div>
            </div>
            
            {   posts.length ?
                    posts.map
                    (blog => 
                        <BlogCard viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>
                    )
                : 
                    <div> 
                        <h1> You have No Posts</h1>
                        <Link href="/create_post"> Make Post</Link>
                    </div>
            }
        </div>
    )
}
