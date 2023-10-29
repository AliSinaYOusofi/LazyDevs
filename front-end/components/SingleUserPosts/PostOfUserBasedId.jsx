"use client";

import React, {useEffect, useState} from 'react'
import BlogCard from '../BlogCard/BlogCard';
import Link from 'next/link';
import FetchPostError from '../Error/FetchPostError/FetchPostError';
import SearchInput from '../SearchInput/SearchInput';
import SearchBlogsBasedProps from '../SearchInput/SearchBlogsBasedProps';

export default function PostOfUserBasedId({author}) {

    const [posts, setPosts] = useState(undefined);
    const [errorMessages, setErrorMessages] = useState('')
    const [sortedBy, setSortedBy] = useState(true)
    const [retryPosts, setRetryPosts] = useState(false)

    useEffect( () => {
        async function getUserBlogsBasedOnAuthorOfTheUser() {

            if (!author) return alert("no author id provided") 
            try {
                const response = await fetch(`http://localhost:3001/accountRoutes/my_posts/:${author}`, {method: "GET"});
                const data = await response.json()
                setPosts(data.data)
            }catch(e) {
                console.log('error in while getting your posts');
                setErrorMessages("failed to fetch your posts")
            }
        }

        getUserBlogsBasedOnAuthorOfTheUser()

    }, [author, retryPosts])

    const reversePosts = () => {
        setPosts([...posts].reverse())
        setSortedBy(prev => ! prev)
    }

    let noPostDiv = 
        <div className="mx-auto w-full"> 
            <h1 className="text-5xl font-extrabold mb-10 "> You have No Posts</h1>
            <Link className="mt-10 text-gray-600 hover:text-black" href="/create_post"> Make Post</Link>
        </div>

    const handleRetryFetchingPosts = () => {
        setRetryPosts(prev => !prev)
        setErrorMessages("")
    }
    if (posts === undefined) {
        return (
            <div className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
                {
                
                    errorMessages ? <div className="h-screen w-full flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
                    
                            <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                            
                                <FetchPostError error={errorMessages} />
                            
                                <button onClick={handleRetryFetchingPosts} className="mt-10 text-lg flex group items-center justify-center  px-5 py-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-sm focus:shadow-outline hover:bg-gray-800"> 
                            
                                    <span className="mr-2">Try again</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group group-hover:animate-spin">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    : <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>
                }
            </div>
        )
    }

    return (
        <div className="w-[70%] ml-10">
            
            {
                posts.length
                ?

                    <div className="">
                        <h1 className="text-5xl  font-bold tracking-wide mt-10 md:mt-0"> Your Posts ({posts.length})</h1>
                        
                        <div className="flex items-center justify-start mt-4 gap-x-4">
                            <div onClick={reversePosts} className="p-2 shadow-black/50 mt-4 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                            </div>
                            <span className="mt-4"> Sorted By: {sortedBy ? "By most viewed" : "By less viewed"}</span>
                        </div>
                        
                        <div className="mt-10 w-full">
                            <SearchBlogsBasedProps blogs={posts}/>
                        </div>
                    </div>
                : noPostDiv
            }
            
            <div className="mt-10"></div>
            {   
                posts.map
                (blog => 
                    <BlogCard viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>
                )
                    
            }
        </div>
    )
}
