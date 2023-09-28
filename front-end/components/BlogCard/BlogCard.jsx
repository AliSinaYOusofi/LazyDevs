import Link from 'next/link'
import React from 'react'

export default function BlogCard({content, title, username, profileUrl, date, id, width, clamp}) {
    
    // so when clicked on the Links we will go to the sing_post_view page
    // with passing the id as they query.

    // in the single_post_view page we get the id. search the database for that
    // id and view all the results in the single_post_view page.
    
    return (
        <div className={`${width ? "w-full" : "max-w-2xl"} px-8 py-4 mx-auto  rounded-lg border-2 border-neutral-300 mt-4`} id={id}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-light text-black">{date ? date.split("T")[0] : ""}</span> 
            </div> 
            <div className="mt-2">
                <Link href={{ pathname:"/view_post", query: {post: id} }} className="overflow-ellipsis line-clamp-1 text-2xl font-bold hover:underline">{title}</Link> 
                <p className={`${clamp ? "line-clamp-3" : "line-clamp-4"}  overflow-ellipsis mt-2 text-black/90`}>{content}</p>
            </div> 
            <div className="flex items-center justify-between mt-4">
                <Link href={{ pathname:"/view_post", query: {post: id} }} className="text-gray-700 transition-all duration-300 hover:underline" id={id}>{date ? "Read more ⟶" : null}</Link> 
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
    )
}