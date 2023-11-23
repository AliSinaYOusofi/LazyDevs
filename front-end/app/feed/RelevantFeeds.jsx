"use client"

import BlogCard from '@/components/BlogCard/BlogCard'
import FetchPostError from '@/components/Error/FetchPostError/FetchPostError'
import { useAppContext } from '@/context/useContextProvider'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RelevantFeeds() {
    
    const [relevantBlogs, setRelevantBlogs] = useState([])
    const [errorMessage, setErrorMessages] = useState('')
    const [retryPosts, setRetryPosts] = useState(false)
    const [sortedBy, setSortedBy] = useState(true)
    const [sorteByDate, setSortedByDate] = useState(false)
    const {currentUser} = useAppContext()
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
                
                if (data.redirectTo) {
                    console.log('redirecting', data.redirectTo)
                    const redirectTo = data.redirectTo
                    router.replace(`http://localhost:3000${redirectTo}`)
                }

                if (data.status === "success") setRelevantBlogs(data.data)
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

    const handleSortedBy = () => {
        
        setSortedBy(prev => ! prev)
        
        sortedBy 
        ?
            setRelevantBlogs(relevantBlogs => relevantBlogs.sort( (a, b) => a.viewCount > b.viewCount))
        :
            setRelevantBlogs(relevantBlogs => relevantBlogs.sort( (a, b) => b.viewCount > a.viewCount))

    }
    
    if (! relevantBlogs?.length) return <div className="flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
        {
          errorMessage ? <div className="h-screen w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
                
                <div className="shadow-white shadow-sm p-2  -translate-y-[30%]  rounded-md w-screen mb-20 flex flex-col justify-center items-center mx-auto tex-black    ">
                    
                    <FetchPostError error={errorMessage} />
                    
                    <button 
                        type="button" 
                        className="py-1 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white transition-all text-lg"
                        onClick={handleRetryFetchingPosts}
                    >
                        Try again
                    </button>
                </div>
            </div>
          : <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>
        }
    </div>

    const handleSortPostsByDate = () => {
        
        setSortedByDate(prev => ! prev)

        setRelevantBlogs( date => {
            const blogsSortedByDate = date.slice().sort( (a, b) => {
                const firstDate = new Date(a.createdAt)
                const secondDate = new Date(b.createdAt)
                return sorteByDate ? firstDate - secondDate : secondDate - firstDate
            })

            return blogsSortedByDate
        })
        
    }
    return (
        <>
            {
            
            errorMessage ?
                
                null :
                
                <div className={`flex items-center justify-start mt-4 gap-x-4 md:ml-0 ml-2`}>
                
                    <div onClick={handleSortedBy} className="p-2 shadow-black/50 mt-4 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full">
                
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    </div>
                
                    <span className={` mt-4`}> Sorted By: {sortedBy ? "By most viewed" : "By less viewd"}</span>

                    <button
                        type="button" 
                        className={`${sorteByDate ? "py-1 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white transition-all text-lg": "py-1 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-500 text-white transition-all text-lg"}`}
                        onClick={handleSortPostsByDate}
                    > SortByDate
                    </button>
                </div>
            }
            <div className="md:w-fit w-screen">
                {
                    relevantBlogs.map(blog => <BlogCard dateDistance={blog.distance} viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>)
                }
            </div>
        </>
    )
}
