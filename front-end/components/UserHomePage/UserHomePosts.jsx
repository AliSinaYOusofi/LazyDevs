"use client";

import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import SearchBlogsBasedProps from '../SearchInput/SearchBlogsBasedProps';
import SingleUserPostBlogTemplate from '../SingleUserPosts/SingleUserPostBlogTemplate';
import OtherUserPosts from '../SingleUserPosts/OtherUserPosts';
import SortData from '../Sort/SortData';

export default function UserHomePosts({author}) {

    const [posts, setPosts] = useState(undefined);
    const [errorMessages, setErrorMessages] = useState('')
    const [sortedBy, setSortedBy] = useState(true)
    const [retryPosts, setRetryPosts] = useState(false)
    const [deletePost, setDeletePost] = useState(false)

    useEffect( () => {
        async function getUserBlogsBasedOnAuthorOfTheUser() {

            if (!author) return alert("no author id provided") 
            
            try {
                const response = await fetch(`http://localhost:3001/accountRoutes/user_posts?user_id=${author}`, 
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
                const data = await response.json()
                if (data.status === "success") setPosts(data.data)
                else if (data.status === "failed") setErrorMessages("Some server error")
            }catch(e) {
                console.error('error in while getting your posts');
                setErrorMessages("failed to fetch your posts")
                setPosts(undefined)
            }
        }

        getUserBlogsBasedOnAuthorOfTheUser()

    }, [author, retryPosts, deletePost])

    let noPostDiv = 
        <div className="mt-10"> 
            <h1 className="text-5xl font-extrabold mb-10 "> This user have no posts</h1>
        </div>

    const handleRetryFetchingPosts = () => {
        setRetryPosts(prev => !prev)
        setErrorMessages("")
    }
    
    if (posts === undefined) {

        return (

            <div className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
                {
                
                    errorMessages ? <div className="h-screen w-full flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
                    
                            <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                            
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
        )
    }

    return (

        <div className="w mx-auto w-[100%] h-full">
            
            {
                posts.length
                ?

                    <div className="md:w-full  md:ml-0 ml-10 ">
                        <h1 className="md:text-4xl text-xl  font-bold tracking-wide mt-10 "> Posts ({posts.length})</h1>
                        
                        <SortData sortedBy={posts} setSortedBy={setPosts} />
                        
                        <div className="mt-10 w-full">
                            <SearchBlogsBasedProps blogs={posts}/>
                        </div>
                    </div>
                : noPostDiv
            }
            
            <div className="mt-10">
                
                {   
                    posts.map
                    (blog => 
                        <OtherUserPosts likes={blog?.likes} commentCount={blog.commentsCount} parentUseEffectTrigger={setDeletePost} dateDifference={blog.distance} viewCount={blog.viewCount} title={blog.title} body={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>
                    )
                        
                }
            </div >
        </div>
    )
}
