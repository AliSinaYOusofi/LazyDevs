import Link from 'next/link'
import React from 'react'
import ReadingTime from '../ReadingTime/ReadingTime'

export default function BlogCard({content, title, username, profileUrl, date, id, width, clamp, viewCount, dateDistance}) {
    
    // so when clicked on the Links we will go to the sing_post_view page
    // with passing the id as they query.

    // in the single_post_view page we get the id. search the database for that
    // id and view all the results in the single_post_view page.
    
    const saveBlogToAccount = () => {
        console.log("save to accoutn", id)
    }

    return (
        <>
            <hr className="mt-3 shadow-sm shadow-white"/>
            <div className={`${width ? "w-full" : "max-w-2xl"} px-8 py-4 mx-auto  rounded-lg mt-4`} id={id}>
                
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
                        <svg onClick={saveBlogToAccount} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    
                    </div> 
                
                    <div className="flex items-center">
                
                        {
                            date
                            ?
                            <img src={profileUrl && date ? profileUrl : "https://stackdiary.com/140x100.png"} alt="Author Photo" className=" object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
                            : null
                        }
                        <span className="font-bold text-black/80">{username}</span>
                    </div>
                </div>
            </div>
        </>
    )
}