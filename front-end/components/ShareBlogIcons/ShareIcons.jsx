"use client";
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { moveToId } from '@/functions/movtToId';
import FetchPostError from '../Error/FetchPostError/FetchPostError';


export default function SocialIcons({post_id}) {

    // const [liked, setLiked] = useState(false);
    
    const [viewCount, setViewCount] = useState(undefined);
    const [commentCount, setCommentCount] = useState(undefined);
    const [currentUrl, setCurrentUrl] = useState("")
    const [errorMessage, setErrorMessages] = useState('')
    const [retryFetchPostViewCount, setRetryFetchPostViewCount] = useState(false)

    // const handleLikes = async () => {
    
    //     setLiked(prev => !prev);
        
    //     try {

    //         let likeStatus = 'disliked';
    //         if (!liked) likeStatus = 'liked';

    //         const dataToSend = {
    //             status: likeStatus,
    //             userEmail: currentUser.email,
    //             post_id
    //         }

    //         const response = await fetch(`http://localhost:3001/blogRoutes/like_post`, 
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify(dataToSend)
    //             },
                
    //         );
    //         const data = await response.json()
    //     }
        
    //     catch(e) {
    //         console.log("error liking the post", e)
    //     }
    // }

    useEffect( () => {
        const likesCommentsCount = async () => {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/get_likes_comments_count/:${post_id}`, {method: "GET"});
                const data = await response.json()
                console.log(data, 'response from view count')

                if (data.status === "success") {
                    setViewCount(data.likeCount?.length)
                    setCommentCount(data.commentCount ?  data.commentCount.length : 0)
                }

                else if (data.status === "failed") setErrorMessages("Failed to get post comments and view")
            }
            catch(e) {
                console.log("error while fetching likes and comments count", e)
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
            <div className=" md:p-2 rounded-full flex flex-col items-center justify-center">
                
                <div className="p-2 shadow-black/50 mt-4 z-[99] shadow-sm bg-white rounded-full w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <span className="text-xl">{viewCount ? viewCount : "0"}</span>
            </div>

            <div onClick={() => moveToId("comments")} className=" md:p-2 rounded-full flex flex-col items-center justify-center cursor-pointer">
                
                <div className="p-2 shadow-black/50 mt-4 md:mt-0 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                </div>
                <span className="text-xl">{commentCount ? commentCount : "0"}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <Link target={"_blank"} href={`https://twitter.com/intent/tweet?text=${currentUrl}`} data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-[#1da1f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                        <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                    </svg>
                </Link>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <Link target={"_blank"} href={`https://www.facebook.com/sharer.php?u=${currentUrl}`}  data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-[#1877f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                    </svg>
                </Link>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <Link href={`https://t.me/share/url?url=${currentUrl}`} target={"_blank"} data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-[#0088cc]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4">
                    <path fill="currentColor" d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"/>
                    </svg>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
                <Link href={`https://wa.me/?text=${currentUrl}`} target={"_blank"} data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block h-fit px-3 py-3 md:px-3 md:py-3 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-[#128c7e]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}