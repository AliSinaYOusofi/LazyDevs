"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ReadingTime from '../ReadingTime/ReadingTime'
import { useAppContext } from '@/context/useContextProvider'
import { toast } from 'react-toastify'
import NotLoggedInCard from '../NotLoggedCard/NotLoggedInCard'
import SavedPostIconBlog from '../SVG/SavedPostBlogIcon'
import UnsavedPostBlogIcon from '../SVG/UnsavedPostIcon'

export default function BlogCard({content, title, username, profileUrl, date, id, width, clamp, viewCount, dateDistance, saved, tags}) {
    
    const [savedToAccount, setSavedToAccount] = useState(false)
    const [showNotLoggedInCard, setNotLoggedInCard] = useState(false)
    const {currentUser} = useAppContext()
    // so when clicked on the Links we will go to the sing_post_view page
    // with passing the id as they query.

    // in the single_post_view page we get the id. search the database for that
    // id and view all the results in the single_post_view page.
    
    useEffect( () => {
        setSavedToAccount(saved)
    }, [])

    console.log(tags)
    const saveBlogToAccount = async () => {
        
        if (!currentUser) return setNotLoggedInCard(prev => ! prev)
        

        try {

            const response = await fetch(`http://localhost:3001/blogRoutes/save_post`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user_id: currentUser._id, post_id: id}),
                    credentials: "include"
                },
            );

            const json = await response.json()
            
            if (json.message === "saved") {
                toast.info("Post saved to account")
                setSavedToAccount(true)
            } else if (json.message === "deleted") {
                toast.info("deleted from saved posts")
                setSavedToAccount(false)
            }
        } 
        catch (e) {
            console.error("while savin to account => " + e)
            toast.error("failed to save! try again")
        }
    }

    return (
        <>
            {/* <hr className="mt-3 shadow-sm shadow-white"/> */}
            <div className={`${width ? "w-full" : "max-w-2xl"} px-8 py-4 mx-auto bg-[#fafafd] transition-all duration-100  from-pink-500 via-red-500 to-yellow-500  rounded-lg mt-4`} id={id}>
                
                <div className="flex items-center justify-between ">
                
                    <span className="text-sm font-light text-black">{date ? date?.split("T")[0] : ""} <i className="text-sm text-gray-600">({dateDistance})</i></span>
                
                    <div className="flex items-center justify-center gap-x-1 bg-gray-50 p-1 rounded-md">
                
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="flex items-center justify-center">{viewCount}</p>
                    </div> 
                </div> 
                <div className="mt-2">
                    
                    <Link href={{ pathname:"/view_post", query: {post: id} }} className="overflow-ellipsis line-clamp-1 text-2xl font-bold hover:underline">{title}</Link> 
                
                    <p className={`${clamp ? "line-clamp-3" : "line-clamp-4"}  overflow-ellipsis mt-2 text-black/90`}>{content}</p>
                </div> 
                <div className="flex items-center justify-between mt-4">
                    
                    <div className="flex gap-x-2" aria-label='save post to your account'>
                        
                        <ReadingTime paragraphs={content} icon={true}/>

                        <div className="cursor-pointer" onClick={saveBlogToAccount}>
                            {
                                ! savedToAccount
                                ?
                                    <UnsavedPostBlogIcon />
                                :
                                    <SavedPostIconBlog />
                            }
                        </div>
                    
                    </div> 
                
                    <div className="flex items-center">
                
                        {
                            date
                            ?
                            <img src={profileUrl && date ? profileUrl : "https://stackdiary.com/140x100.png"} alt="Author Photo" className=" object-cover w-8 h-8 mx-4 rounded-full sm:block" /> 
                            : null
                        }
                        <span className="font-bold text-black/80">{username}</span>
                    </div>
                </div>
                
                <div className="w-full text-gray-400 flex flex-row gap-x-2">
                    
                    {
                        tags && tags.length > 0
                        ? tags.map( tag => tag !== "#" ? <Link className="hover:underline hover:text-black" href={{pathname: `/hashtag/${tag}`}}> {tag}</Link> : null)
                        : null
                    }
                </div>
            </div>
            
            <div id="login" className="">
                {
                    showNotLoggedInCard ?
                    <>
                        <div className="blurry-background flex items-center justify-center">
                            <NotLoggedInCard clicked={showNotLoggedInCard} onClose={setNotLoggedInCard}/> 
                        </div>
                    </>
                    : null
                }
            </div>
        </>
    )
}