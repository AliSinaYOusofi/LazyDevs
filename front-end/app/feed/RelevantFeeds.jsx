"use client"

import BlogCard from '@/components/BlogCard/BlogCard'
import FetchPostError from '@/components/Error/FetchPostError/FetchPostError'
import { useAppContext } from '@/context/useContextProvider'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import SortData from '@/components/Sort/SortData'
import delete_cookie from '@/functions/delete_cookie'

export default function RelevantFeeds() {
    
    const [relevantBlogs, setRelevantBlogs] = useState([])
    const [isBasedOnTags, setIsBasedOnTags] = useState(undefined)
    const [errorMessage, setErrorMessages] = useState('')
    const [retryPosts, setRetryPosts] = useState(false)
    // const [sortedBy, setSortedBy] = useState(true)
    // const [sorteByDate, setSortedByDate] = useState(false)
    const {currentUser, setCurrentUser} = useAppContext()
    const router = useRouter()

    useEffect( () => {
        async function getRelevantBlogs() {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/newsfeed?user_id=${currentUser ? currentUser?._id : null}`, 
                    {
                        method: "GET",
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:3000"
                        },
                        credentials: "include"
                    }
                );

                const data = await response.json()
                
                console.log(data, ' relevant ffeed')
                if (data.redirectTo) {
                    
                    const redirectTo = data.redirectTo
                    localStorage.removeItem("currentUser")
                    
                    delete_cookie("refreshToken")
                    delete_cookie('accessToken')
                    setCurrentUser(null)
                    router.replace(`http://localhost:3000${redirectTo}`)
                }

                if (data.status === "success") {
                    setRelevantBlogs(data.data)
                    setIsBasedOnTags(data.isPostsBasedOnTags)
                }
                else if (data.status === "failed") setErrorMessages("There was a problem fetching posts!")
                else setErrorMessages("server error while fethcing posts")
            } 
            catch(e) {
                console.error('error in while getting feeds');
                setErrorMessages("There was a problem fetching posts!")
                setRelevantBlogs([])
            }
        }
        getRelevantBlogs()
      }, [retryPosts])
    
    const handleRetryFetchingPosts = () => {
        setRetryPosts(prev => ! prev)
        setErrorMessages("")
    }

    // const handleSortedBy = () => {
        
    //     setSortedBy(prev => ! prev)
        
    //     sortedBy 
    //     ?
    //         setRelevantBlogs(relevantBlogs => relevantBlogs.sort( (a, b) => a.viewCount > b.viewCount))
    //     :
    //         setRelevantBlogs(relevantBlogs => relevantBlogs.sort( (a, b) => b.viewCount > a.viewCount))

    // }
    
    if (! relevantBlogs?.length) return <div className="flex h-screen items-center justify-center mx-auto right-[50%] mt-[4rem]">
        {
          errorMessage ? <div className="h-screen w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
                
                <div className="shadow-white shadow-sm p-2  -translate-y-[30%]  rounded-md w-screen mb-20 flex flex-col justify-center items-center mx-auto tex-black    ">
                    <button 
                        type="button" 
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                        onClick={handleRetryFetchingPosts}   
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

    // const handleSortPostsByDate = () => {
        
    //     setSortedByDate(prev => ! prev)

    //     setRelevantBlogs( date => {
    //         const blogsSortedByDate = date.slice().sort( (a, b) => {
    //             const firstDate = new Date(a.createdAt)
    //             const secondDate = new Date(b.createdAt)
    //             return sorteByDate ? firstDate - secondDate : secondDate - firstDate
    //         })

    //         return blogsSortedByDate
    //     })
        
    // }
    return (
        <>
            {
            
            errorMessage ?
                
                null :
                
                <div className={`flex items-center justify-start mt-4 gap-x-4 md:ml-0 ml-2`}>
                
                    <SortData setSortedBy={setRelevantBlogs} sortedBy={relevantBlogs} />
                </div>
            }
            <div className="md:w-fit w-screen">
                <h1 className="text-2xl ml-4 md:ml-0  font-bold tracking-wide mt-10"> Posts are based on the tags your following </h1>
                <p className="font-bold ml-4 md:ml-0  tracking-wide text-gray-500"> You can change tags <Link href="/my_account" className="hover:text-black underline hover:cursor-pointer"> here.</Link></p>

                <p className="mt-10 text-red-500 ml-4 md:ml-0">
                    {
                        !isBasedOnTags 
                            ? "*Could not find any post matching your tags. Displaying random posts "
                        : ""
                    }
                </p>
            </div>

            <div className="px-4">
                {
                    relevantBlogs.map(blog => <BlogCard likes={blog?.likes} author={blog?.author} tags={blog?.tags} dateDistance={blog.distance} viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>)
                }

            </div>
        </>
    )
}
