"use client"
import React, {useEffect, useState} from 'react'
import UserCard from '@/components/UserInfoCard/UserCard';
import SocialIcons from '@/components/ShareBlogIcons/ShareIcons';
import BlogCard from '@/components/BlogCard/BlogCard';
import CommentParent from '@/components/CommentSection.jsx/CommentParent';
import { moveToId } from '@/functions/movtToId';
import { useRouter, useSearchParams } from 'next/navigation';
import ReadingTime from '@/components/ReadingTime/ReadingTime';

import SearchBlogsBasedProps from '@/components/SearchInput/SearchBlogsBasedProps';
import useCurrentUser from '@/hooks/useCurrentUser';
import MarkdownToHtml from '@/components/MarkDown/MarDownToHtml';
import SortData from '@/components/Sort/SortData';
import Link from 'next/link';
import delete_cookie from '@/functions/delete_cookie';
import { useAppContext } from '@/context/useContextProvider';
import { debounce } from 'lodash';
import PostNotFoundDiv from './PostNotFound';
import WhoLiked from './WhoLiked';


export default function Page() {

    const post_id = useSearchParams().get("post");
    
    const [currentBlog, setCurrentBlog] = useState(undefined)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [errorMessages, setErrorMessages] = useState('')
    const [retryPosts, setRetryPosts] = useState(false)
    const [retryRecentPosts, setRetryRecentPosts] = useState(false)
    const [showPostLikers, setShowPostLikers] = useState(false)
    const [hideLikersDiv, setHideLikersDiv] = useState(false)
    const currentUser = useCurrentUser()
    const router = useRouter()
    const {setCurrentUser} = useAppContext()
    
    useEffect( () => {
        
        const getCurrentBlog = async () => {
            
            try {
                
                const response = await fetch(`http://localhost:3001/blogRoutes/single_post/?post_id=${post_id}`, 
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
                
                const data = await response.json()
                
                if (data.redirectTo) {
                    const redirectTo = data.redirectTo
                    delete_cookie("refreshToken")
                    delete_cookie("accessToken")

                    setCurrentUser(null)
                    router.replace(`http://localhost:3000${redirectTo}`)
                }
                
                if (data.status === "success") setCurrentBlog(data.data)
                
                else if (data.message === "failed" && data.reason !== "notfound") setErrorMessages(previousErrorMessages => ({...previousErrorMessages, "currentBlogFetchError": "There was a problem fetching this post!"}))
                
                if (data.status === "failed" && data.data === "notfound") {
                    setCurrentBlog("notfound")
                }

                if (data.status === undefined) {
                    setErrorMessages( previousErrorMessages => ({...previousErrorMessages, "currentBlogFetchError": "There was a problem fetching this post!"}))
                }
            }
            catch(e) {
                console.error("while current blog", e)
                setErrorMessages(previousMessages => ({...previousMessages, "currentBlogFetchError": "was a problem fetching this post!"}))
            }
        }
        getCurrentBlog();
    }, [post_id, retryPosts]);

    useEffect( () => {
        
        const getRecentBlogs = async () => {
            try {
                
                const response = await fetch(`http://localhost:3001/blogRoutes/recent?post_id=${post_id}`, 
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
                body: JSON.stringify(dataToSend),
                credentials: "include"
            });
        }
        catch(e) {
            console.error("error while fetching data", e)
        }
    }

    let debouncedSaveNewVisitor = debounce(saveNewViewer, 1000)

    useEffect( () => {
        
        debouncedSaveNewVisitor()
        
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
            
            errorMessages?.currentBlogFetchError ? <div className=" w-full flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
            
                    <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                    
                        <button 
                            type="button" 
                            className="py-1 h-8 text-lg font-light md:h-10 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
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
                        
                            <button 
                                type="button" 
                                className="py-1 h-8 md:h-10 text-lg font-light px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                                onClick={handleRetryRecentPosts} 
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
    }

    else if (currentBlog === "notfound") return <PostNotFoundDiv />
    
    return (
        <>
            <div className={`w-screen relative flex flex-col md:flex-row justify-start items-start makeBlurry `}>
                
                <div className="mx-auto md:mt-0 mt-4 md:w-fit  w-full">
                    <SocialIcons post_id={post_id}/>
                </div>
                
                <div className="p-10 w-full md:max-w-[50%] mx-auto border-[1px] border-gray-100 overflow-hidden overflow-ellipsis">
                    
                    <UserCard isFollowing={currentBlog?.alreadyFollows} author={currentBlog?.author} difference={currentBlog?.distance} email={currentBlog?.email} date={currentBlog?.createdAt} username={currentBlog?.username} profile={currentBlog?.profileUrl} />
                    <ReadingTime paragraphs={currentBlog?.body}/>
                    
                    <h1 className="text-3xl  font-bold tracking-wide mt-10"> Tags used:</h1>

                    <div className="mt-5">

                        {
                            currentBlog && currentBlog?.tags ? currentBlog.tags.map(
                                tag => tag !== "#" 
                                ? <Link className="hover:underline text-gray-400 mt-4 hover:text-black" href={{pathname: `/hashtag/${tag}`}}> {tag}</Link> 
                                : null
                            )
                            : null
                        }
                    </div>

                    <div className=" flex w-1/2 mt-4 items-center transition-all duration-200 border-black border-[1px] rounded-full p-1 " onClick={() => setShowPostLikers(prev => ! prev)}>
                                
                        {
                            showPostLikers
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                            </svg>
                        }
                        <span className="text-gray-500">hide/unhide post likers</span>
                    </div>

                    {
                        showPostLikers ? <WhoLiked post_id={post_id}/> : null
                    }
                    {/* <TextToSpeech text={currentBlog?.body}/> */}
                    
                    <hr className="mt-10"/>
                    {currentBlogErrorDiv}
                    
                    {/* <h1 className="mt-4 mb-4 headerBlog ml-6 text-xl   font-extrabold  leading-tight text-gray-900 lg:mb-6 lg:text-2xl">{currentBlog ? currentBlog.title : ""}</h1> */}
                    
                    <MarkdownToHtml content={currentBlog ? currentBlog?.body : ""} />
                    <CommentParent post_id={post_id}/>
                </div>

                <div className="md:w-[30%] w-full flex flex-col  overflow-ellipsis headerBlog px-2 md:pr-10">
                    
                    <h1 className="text-5xl  font-bold tracking-wide mt-10"> Recent Posts </h1>
                    <p className="font-bold tracking-wide text-gray-500"> Posts from the 15 days before latest post</p>
                    {
                        errorMessages?.recentBlogsFetchError
                    
                        ? null :
                            <div className="flex items-center justify-start mt-4 gap-x-4 mb-4">
                                <SortData sortedBy={recentBlogs} setSortedBy={setRecentBlogs} />
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
                            ? recentBlogs?.map(blog => <BlogCard commentsCount={blog?.commentsCount} likes={blog?.likes} author={blog?.author} tags={blog?.tags} saved={blog?.saved} dateDistance={blog.distance} viewCount={blog.viewCount} clamp="3" width={"f"} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>) : null
                    }
                </div>

            </div>
        </>
    )
}
