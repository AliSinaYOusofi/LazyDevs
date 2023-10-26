"use client"

import BlogCard from '@/components/BlogCard/BlogCard';
import FetchPostError from '@/components/Error/FetchPostError/FetchPostError';
import Spinner from '@/components/Spinner/Spinner';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'

export default function Page() {
  
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessages] = useState('')
  const [retryPosts, setRetryPosts] = useState(false)

  useEffect( () => {
    async function getBlogs() {
        try {
          const response = await fetch('http://localhost:3001/blogRoutes/newsfeed', {method: "GET"});
          const data = await response.json()
          setBlogs(data.data)
        }catch(e) {
            console.log('error in while getting feeds');
            setErrorMessages("There was a problem fetching posts!")
            setBlogs([])
        }
    }
    getBlogs()
  }, [retryPosts])

  const handleRetryFetchingPosts = () => {
    setRetryPosts(prev => ! prev)
    setErrorMessages("")
  }

  if (! blogs?.length) return <div className="h-screen w-screen flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
    {
      errorMessage ? <div className="h-screen w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
      <div className="shadow-white shadow-sm p-2  rounded-md  w-1/2 h-1/2 flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
          <FetchPostError error={errorMessage} />
          <button onClick={handleRetryFetchingPosts} className="mt-10 flex group items-center justify-center  px-5 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-sm focus:shadow-outline hover:bg-gray-800"> 
            <span className="mr-2 pb-2">Try again</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group group-hover:animate-spin">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
      </div>
  </div>
      : <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>
    }
  </div>

  return (
    <div className="w-full bg-white/30 mx-auto z-[999]">
      <div className="w-[60%] mx-auto flex flex-col items-center justify-start">

                
        <div onClick={() => setBlogs([...blogs].reverse())} className="p-2 shadow-black/50 mt-4 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>
        </div>

        <div className="max-w-2xl">

          {
            blogs.map(blog => <BlogCard viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>)
          }
        </div>
      </div>
    </div>
  )
}
