"use client";

import PostText from '@/components/PostText/PostText';
import { useSearchParams } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import UserCard from '@/components/UserInfoCard/UserCard';
import SocialIcons from '@/components/ShareBlogIcons/ShareIcons';
import BlogCard from '@/components/BlogCard/BlogCard';
import Footer from '@/components/Footer/Footer';
import CommentParent from '@/components/CommentSection.jsx/CommentParent';

export default function layout({children}) {
    
    const post_id = useSearchParams().get("post");
    const [currentBlog, setCurrentBlog] = useState([{}])
    const [recentBlogs, setRecentBlogs] = useState([{}])
    
    useEffect( () => {
        
        const getCurrentBlog = async () => {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/single_post/:${post_id}`, {method: "POST"});
                const data = await response.json()
                setCurrentBlog(data.data)
                console.log(data.data)
            }
            catch(e) {
                console.log("error while fetching data", e)
            }
        }

        getCurrentBlog();
    }, []);

    if (! currentBlog) {
        <div className="w-full flex flex-row">
            <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>

            <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    }

    useEffect( () => {
        const recentBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/newsfeed`, {method: "GET"});
                const data = await response.json()
                setRecentBlogs(data.data)
                console.log(data.data)
            }
            catch(e) {
                console.log("error while fetching data", e)
            }
        }

        recentBlogs()
    }, [])

    return (
        <>

            <Navbar />

            <div className="w-full flex flex-col md:flex-row justify-start items-start">
                
                <div className="">
                    <SocialIcons />
                </div>
                
                <div className="p-10 w-full md:max-w-[50%] mx-auto border-[1px] border-gray-100 overflow-hidden overflow-ellipsis">
                    <UserCard email={currentBlog?.email} date={currentBlog?.joined} username={currentBlog?.username} profile={currentBlog?.profileUrl} />
                    <h1 className=" mb-4 headerBlog ml-6 text-xl   font-extrabold  leading-tight text-gray-900 lg:mb-6 lg:text-2xl">{currentBlog ? currentBlog.title : ""}</h1>
                    {
                        currentBlog ? currentBlog.body?.split("\n").map( (line, index) => line.startsWith("![]") ? <img src={line} alt=""  /> : <PostText key={index}  text={line}/>) : ""
                    }
                    <CommentParent post_id={post_id}/>
                </div>

                <div className="md:w-[30%] w-full flex flex-col  overflow-ellipsis headerBlog px-2 md:pr-10">
                    {
                        recentBlogs.map(blog => <BlogCard clamp="3" width={"f"} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog.post_id}/>)
                    }
                </div>

            </div>
            {children}
            <Footer />
        </>
    )
}
