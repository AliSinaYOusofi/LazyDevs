"use client"
import React, {useEffect, useState} from 'react'
import UserCard from '@/components/UserInfoCard/UserCard';
import SocialIcons from '@/components/ShareBlogIcons/ShareIcons';
import BlogCard from '@/components/BlogCard/BlogCard';
import CommentParent from '@/components/CommentSection.jsx/CommentParent';
import { moveToId } from '@/functions/movtToId';
import { useAppContext } from '@/context/useContextProvider';
import PostText from '@/components/PostText/PostText';
import { useSearchParams } from 'next/navigation';
import ReadingTime from '@/components/ReadingTime/ReadingTime';
import FetchPostError from '@/components/Error/FetchPostError/FetchPostError';
import RecentPostsError from '@/components/Error/RecentPostsError/RecentPostError';

export default function Page() {

    const post_id = useSearchParams().get("post");
    const [currentBlog, setCurrentBlog] = useState(undefined)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [errorMessages, setErrorMessages] = useState('')
    const [retryPosts, setRetryPosts] = useState(false)
    const [retryRecentPosts, setRetryRecentPosts] = useState(false)

    const {currentUser} = useAppContext();
    
    useEffect( () => {
        
        const getCurrentBlog = async () => {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/single_post/:${post_id}`, {method: "POST"});
                const data = await response.json()
                setCurrentBlog(data.data)
                if (data.data === undefined) {
                    setErrorMessages( previousErrorMessages => ({...previousErrorMessages, "currentBlogFetchError": "There was a problem fetching this post!"}))
                }
                console.log(errorMessages)
            }
            catch(e) {
                console.log("while current blog", e)
                setErrorMessages(previousMessages => ({...previousMessages, "currentBlogFetchError": "was a problem fetching this post!"}))
            }
        }
        getCurrentBlog();
    }, [post_id, retryPosts]);

    useEffect( () => {
        
        const getRecentBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/newsfeed`, {method: "GET"});
                const data = await response.json()
                
                setRecentBlogs(data.data)
                if (data.data === undefined) setErrorMessages(previousErrorMessages => ({...previousErrorMessages, "recentBlogsFetchError": "Problem fetching recent posts"}))
            }
            catch(e) {
                console.log("while getting recent blogs", e)
                setErrorMessages(previousErrorMessages => ({...previousErrorMessages, "recentBlogsFetchError": "Problem fetching recent posts"}))
                setRecentBlogs(undefined)
            }
        }
        getRecentBlogs()
    }, [post_id, retryRecentPosts])

    useEffect( () => {
        
        const saveNewViewer = async () => {

            if (! currentUser) return

            try {
                const dataToSend = {
                    post_id,
                    user_id: currentUser._id
                }
                await fetch(`http://localhost:3001/blogRoutes/save_new_visitor`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                });
            }
            catch(e) {
                console.log("error while fetching data", e)
            }
        }
        saveNewViewer()
        moveToId("nav")
    }, [post_id])

    const handleRetryFetchingPosts = () => {
        setRetryPosts(prev => ! prev)
        setErrorMessages(previousErrorMessages => [...previousErrorMessages].filter(item => item !== "currentBlogFetchError"))
    }

    let currentBlogErrorDiv;
    if (currentBlog === undefined) {

        currentBlogErrorDiv = <div className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
            {
            
            errorMessages ? <div className="h-screen w-full flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
            
                    <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                    
                        <FetchPostError error={errorMessages?.currentBlogFetchError} />
                    
                        <button onClick={handleRetryFetchingPosts} className="mt-10 text-lg flex group items-center justify-center  px-5 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-sm focus:shadow-outline hover:bg-gray-800"> 
                    
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
    }
    
    const handleRetryRecentPosts = () => {
        setRetryRecentPosts(prev => !prev)
    }
    let recentPostsDivError

    if (recentBlogs === undefined) {
        recentPostsDivError = <div className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
            {
            
            errorMessages?.recentBlogsFetchError ? <div className=" flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
            
                    <div className="p-2  rounded-md flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                    
                        <RecentPostsError error={errorMessages?.recentBlogsFetchError} />
                    
                        <button onClick={handleRetryRecentPosts} className="mt-10 flex group items-center justify-center  px-2 text-lg text-gray-100 transition-colors duration-150 bg-gray-700 rounded-sm focus:shadow-outline hover:bg-gray-800"> 
                    
                            <span className="mr-2">Try again</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group group-hover:animate-spin">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                    </div>
                </div>
            : <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>
            }
        </div>
    }
    
    return (
        <>
            <div className="w-full relative flex flex-col md:flex-row justify-start items-start">
                
                <div className="">
                    <SocialIcons post_id={post_id}/>
                </div>
                
                <div className="p-10 w-full md:max-w-[50%] mx-auto border-[1px] border-gray-100 overflow-hidden overflow-ellipsis">
                    <UserCard email={currentBlog?.email} date={currentBlog?.joined} username={currentBlog?.username} profile={currentBlog?.profileUrl} />
                    <ReadingTime paragraphs={currentBlog?.body}/>
                    {currentBlogErrorDiv}
                    <h1 className="mt-4 mb-4 headerBlog ml-6 text-xl   font-extrabold  leading-tight text-gray-900 lg:mb-6 lg:text-2xl">{currentBlog ? currentBlog.title : ""}</h1>
                    {
                        currentBlog ? currentBlog.body?.split("\n").map( (line, index) => line.startsWith("![]") ? <img src={line} alt=""  /> : <PostText key={index}  text={line}/>) : ""
                    }
                    <CommentParent post_id={post_id}/>
                </div>

                <div className="md:w-[30%] w-full flex flex-col  overflow-ellipsis headerBlog px-2 md:pr-10">
                    {recentPostsDivError}
                    {
                        recentBlogs && recentBlogs.length > 0
                            ? recentBlogs?.map(blog => <BlogCard clamp="3" width={"f"} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>) : null
                    }
                </div>

            </div>  
        </>
    )
}
