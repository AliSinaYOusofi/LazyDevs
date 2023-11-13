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
import SearchBlogsBasedProps from '@/components/SearchInput/SearchBlogsBasedProps';
import useCurrentUser from '@/hooks/useCurrentUser';
import MarkdownToHtml from '@/components/MarkDown/MarDownToHtml';

export default function Page() {

    const post_id = useSearchParams().get("post");
    const [currentBlog, setCurrentBlog] = useState(undefined)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [errorMessages, setErrorMessages] = useState('')
    const [retryPosts, setRetryPosts] = useState(false)
    const [retryRecentPosts, setRetryRecentPosts] = useState(false)
    const [sortedBy, setSortedBy] = useState(false)
    const currentUser = useCurrentUser()
    
    useEffect( () => {
        
        const getCurrentBlog = async () => {
            
            try {
                
                const response = await fetch(`http://localhost:3001/blogRoutes/single_post/:${post_id}`, {method: "GET"});
                const data = await response.json()
                
                setCurrentBlog(data.data)
                
                if (data.data === undefined) {
                    setErrorMessages( previousErrorMessages => ({...previousErrorMessages, "currentBlogFetchError": "There was a problem fetching this post!"}))
                }
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
                
                console.log(currentUser, 'current user')
                const response = await fetch(`http://localhost:3001/blogRoutes/recent?post_id=${post_id}&user_id=${currentUser ? currentUser?._id : null}`, 
                    {
                        method: "GET",
                        credentials: "include"
                    }   
                );
                const data = await response.json()
                
                if (data.data) setRecentBlogs(data.data)
                else if (data.data === undefined) setErrorMessages(previousErrorMessages => ({...previousErrorMessages, "recentBlogsFetchError": "Problem fetching recent posts"}))
            }
            catch(e) {
                console.error("while getting recent blogs", e)
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
        setErrorMessages(previousErrorMessages => {
            const {currentBlogFetchError, ...rest} = previousErrorMessages
            return rest
        })
    }

    let currentBlogErrorDiv;
    if (currentBlog === undefined) {

        currentBlogErrorDiv = <div key="curretnBlogDivError" className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
            {
            
            errorMessages?.currentBlogFetchError ? <div className="h-screen w-full flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
            
                    <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                    
                        <FetchPostError error={errorMessages?.currentBlogFetchError} />
                    
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
    }
    
    const handleRetryRecentPosts = () => {
        setRetryRecentPosts(prev => !prev)
        setErrorMessages(previousErrorMessages => {
            const {recentBlogsFetchError, ...rest} = previousErrorMessages
            return rest
        })
    }
    let recentPostsDivError

    if (recentBlogs === undefined) {
        recentPostsDivError = <div key="recentPostsDivError" className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
            {
                errorMessages?.recentBlogsFetchError ? <div className=" flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
                
                        <div className="p-2  rounded-md flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                        
                            <RecentPostsError error={errorMessages?.recentBlogsFetchError} />
                        
                            <button onClick={handleRetryRecentPosts} className="mt-10 flex group items-center justify-center  px-2 py-1 text-lg text-gray-100 transition-colors duration-150 bg-gray-700 rounded-sm focus:shadow-outline hover:bg-gray-800"> 
                        
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
    
    const handleSortRecentPosts = () => {
       setRecentBlogs([...recentBlogs].reverse())
       setSortedBy(prev => !prev)
    }

    return (
        <>
            <div className={`w-screen relative flex flex-col md:flex-row justify-start items-start makeBlurry `}>
                
                <div className="mx-auto md:mt-0 mt-4 md:w-fit  w-full">
                    <SocialIcons post_id={post_id}/>
                </div>
                
                <div className="p-10 w-full md:max-w-[50%] mx-auto border-[1px] border-gray-100 overflow-hidden overflow-ellipsis">
                    
                    <UserCard difference={currentBlog?.distance} email={currentBlog?.email} date={currentBlog?.createdAt} username={currentBlog?.username} profile={currentBlog?.profileUrl} />
                    
                    <ReadingTime paragraphs={currentBlog?.body}/>

                    {/* <TextToSpeech text={currentBlog?.body}/> */}
                    
                    <hr className="mt-10"/>
                    {currentBlogErrorDiv}
                    
                    {/* <h1 className="mt-4 mb-4 headerBlog ml-6 text-xl   font-extrabold  leading-tight text-gray-900 lg:mb-6 lg:text-2xl">{currentBlog ? currentBlog.title : ""}</h1> */}
                    
                    <MarkdownToHtml content={currentBlog ? currentBlog?.body : ""} />
                    <CommentParent post_id={post_id}/>
                </div>

                <div className="md:w-[30%] w-full flex flex-col  overflow-ellipsis headerBlog px-2 md:pr-10">
                    
                    <h1 className="text-5xl  font-bold tracking-wide mt-10"> Recent Posts </h1>
                    
                    {
                        errorMessages?.recentBlogsFetchError
                    
                        ? null :
                            <div className="flex items-center justify-start mt-4 gap-x-4">
                                <div onClick={handleSortRecentPosts} className="p-2 shadow-black/50 mt-4 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full w-fit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                </div>
                                <span className="mt-4"> Sorted By: {sortedBy ? "By most viewed" : "By less viewed"}</span>
                            </div>
                    }

                    {recentPostsDivError}
                    
                    {
                        recentBlogs && recentBlogs.length > 0
                        ? <SearchBlogsBasedProps showTitle={true} blogs={recentBlogs} size="tre"/>
                        : null
                    }

                    {
                        recentBlogs && recentBlogs.length > 0
                            ? recentBlogs?.map(blog => <BlogCard saved={blog?.saved} dateDistance={blog.distance} viewCount={blog.viewCount} clamp="3" width={"f"} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>) : null
                    }
                </div>

            </div>
            
        </>
    )
}
