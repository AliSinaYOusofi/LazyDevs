"use client"

import BlogCard from '@/components/BlogCard/BlogCard';
import React, {useState, useEffect} from 'react'

export default function Page() {
  const [blogs, setBlogs] = useState([])

  useEffect( () => {
    async function getBlogs() {
        try {
          const response = await fetch('http://localhost:3001/blogRoutes/newsfeed', {method: "GET"});
          const data = await response.json()
          setBlogs(data.data)
          console.log(data.data, 'from getting the blogs checking id or post_id')
        }catch(e) {
            console.log('error in while getting feeds');
        }
    }
    getBlogs()
  }, [])

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
