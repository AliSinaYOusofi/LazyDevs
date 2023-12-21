"use client";
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { moveToId } from '@/functions/movtToId';
import FetchPostError from '../Error/FetchPostError/FetchPostError';
import EyeView from '../SVG/ViewEye';
import CommentIcon from '../SVG/CommentIcon';
import { set } from 'lodash';


export default function SocialIcons({post_id}) {

    const [liked, setLiked] = useState(false);
    const [alreadyLikes, setAlreadyLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(undefined)
    const [viewCount, setViewCount] = useState(undefined);
    const [commentCount, setCommentCount] = useState(undefined);
    const [currentUrl, setCurrentUrl] = useState("")
    const [errorMessage, setErrorMessages] = useState('')
    const [retryFetchPostViewCount, setRetryFetchPostViewCount] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const handleLikes = async () => {
    
        setLiked(prev => !prev);
        setSpinner(true)
        
        try {

            const dataToSend = {
                status: !liked,
                post_id
            }

            const response = await fetch(`http://localhost:3001/blogRoutes/like_post`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend),
                    credentials: "include"
                },
                
            );
            
            const data = await response.json()

            if (data.data === "liked") {
                setLiked( true )
            } else if (data.data === "disliked") {
                setLiked(false)
            }
        }
        
        catch(e) {
            console.error("error liking the post", e)
        }
        finally {
            setSpinner(false)
            setRetryFetchPostViewCount(perev => ! perev)
        }
    }

    useEffect( () => {
        
        const likesCommentsCount = async () => {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/get_likes_comments_count?post_id=${post_id}`, 
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
                const data = await response.json()

               
                if (data.status === "success") {
                    setViewCount(data?.view_count ? data.view_count?.length : 0)
                    setCommentCount(data?.commentCount ?  data.commentCount.length : 0)
                    setLikesCount(data?.likes_count ? data.likes_count.length : 0)
                    setAlreadyLiked(data?.already_user_liked ? true : false)
                }

                else if (data.status === "failed") setErrorMessages("Failed to get post comments and view")
    
            }
            catch(e) {
                console.error("error while fetching likes and comments count", e)
                setErrorMessages("Failed to get post comments and view")
                setCommentCount(undefined)
            }
        }

        if (window) setCurrentUrl(window.location.href)
        likesCommentsCount();   
    }, [post_id, retryFetchPostViewCount])

    const hanldeRetryFetch = () => {
        setRetryFetchPostViewCount(prev => !prev)
        setErrorMessages("")
    }
    
    let fetchErrorDiv
    
    if (commentCount === undefined) {
        
        fetchErrorDiv = errorMessage ? <div className="mt-4 px-4 flex flex-col  items-center justify-center">
            
            <svg onClick={hanldeRetryFetch} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            
            <FetchPostError error={errorMessage}/>  
            </div> 
            
            :
            <div className="border-t-transparent mt-4 border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>

    }
    return (
        <div className="flex md:ml-4 ml-0 md:flex-col flex-row items-center justify-center socials md:mt-0 mt-4 gap-4 mr-4 md:mr-0">
            
            <div onClick={handleLikes} className=" md:p-2 rounded-full flex flex-col items-center justify-center mt-10 cursor-pointer">
                
                <button disabled={spinner}>
                    {
                        liked || alreadyLikes
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    }
                </button>
                <span className="text-xl">{likesCount ? likesCount : "0"}</span>
            </div>
            
            <div className=" md:p-2 rounded-full flex flex-col items-center justify-center">
                
                <div className="mt-3 md:mt-4 z-[99] w-fit">
                    <EyeView />
                </div>
                <span className="text-xl">{viewCount ? viewCount : "0"}</span>
            </div>

            <div onClick={() => moveToId("comments")} className=" md:p-2 rounded-full flex flex-col items-center justify-center cursor-pointer">
                
                <div className="mt-4 md:mt-0 z-[99] hover:cursor-pointer w-fit">
                    <CommentIcon />
                </div>
                <span className="text-xl">{commentCount ? commentCount : "0"}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <Link 
                    target={"_blank"} 
                    href={`https://twitter.com/intent/tweet?text=${currentUrl}`} 
                    className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 transition-transform duration-300 hover:-translate-y-1 p-1">
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        className="w-8 h-8"
                    >
                        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                    </svg>
                </Link>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <Link 
                    target={"_blank"} 
                    href={`https://www.facebook.com/sharer.php?u=${currentUrl}`}  
                    className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 transition-transform duration-300 hover:-translate-y-1 p-1"
                >
                    <svg
                        viewBox="0 0 960 1000"
                        fill="currentColor"
                        className="w-8 h-8"
                        >
                        <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980s-246.667-47-340-141S0 632 0 500c0-133.333 46.667-246.667 140-340S346.667 20 480 20m114 330v-78h-72c-29.333 0-54 11-74 33s-30 49-30 81v44h-76v74h76v222h86V504h90v-74h-90v-52c0-18.667 6-28 18-28h72" />
                    </svg>
                </Link>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <Link 
                    href={`https://t.me/share/url?url=${currentUrl}`} 
                    target={"_blank"} 
                    className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 transition-transform duration-300 hover:-translate-y-1 p-1"
                >
                    <svg
                        viewBox="0 0 496 512"
                        fill="currentColor"
                        className="w-8 h-8"
                    >
                        <path d="M248 8C111.033 8 0 119.033 0 256s111.033 248 248 248 248-111.033 248-248S384.967 8 248 8zm114.952 168.66c-3.732 39.215-19.881 134.378-28.1 178.3-3.476 18.584-10.322 24.816-16.948 25.425-14.4 1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25 5.342-39.5 3.652-3.793 67.107-61.51 68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608 69.142-14.845 10.194-26.894 9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7 18.45-13.7 108.446-47.248 144.628-62.3c68.872-28.647 83.183-33.623 92.511-33.789 2.052-.034 6.639.474 9.61 2.885a10.452 10.452 0 013.53 6.716 43.765 43.765 0 01.417 9.769z" />
                    </svg>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
                <Link 
                    href={`https://wa.me/?text=${currentUrl}`} 
                    target={"_blank"} data-mdb-ripple="true" 
                    className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 transition-transform duration-300 hover:-translate-y-1 p-1"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                    >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}