import React, { useState } from 'react'
import Link from 'next/link'
import CommentIcon from '../SVG/CommentIcon'

export default function OtherUserPosts({title, date, viewCount, commentCount, dateDifference, id, body, likes}) {

    return (
        
        <>
            <div id={id} className=" flex  flex-col gap-y- md:flex-row md:items-center justify-evenly mt-3 mb-3 bg-white p-2 rounded-md">
                <div className="md:w-1/2 ">
                    <p className="mt-4 md:text-base text-sm">{date ? date.split("T")[0] : ""} <i className="md:text-sm text-xs text-gray-600"> ({dateDifference}) </i></p>
                    <Link href={{ pathname:"/view_post", query: {post: id} }} className="md:text-2xl text-xl line-clamp-1 hover:underline  font-bold tracking-wide mt-4">{title}</Link>
                    <p className="line-clamp-4 mt-4">{body}</p>
                </div>

                <div className="flex flex-row items-center gap-x-4 mt-3">
                    
                    <div className="flex items-center gap-x-1">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {viewCount}
                    </div>

                    <div className="flex items-center gap-x-1">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <p className="flex items-center justify-center">{likes}</p>
                    </div>

                    <div className="flex items-center gap-x-1">
                        
                        <CommentIcon />
                        {commentCount || 0}
                    </div>

                </div>
            </div>
            
        </>
    )
}
