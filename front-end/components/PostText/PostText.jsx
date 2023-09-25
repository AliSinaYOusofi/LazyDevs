import React from 'react'

export default function PostText({text}) {
    return (
        <div className="text-black headerBlog px-8 font-serif text-xl md:ml-0 ml-10 overflow-hidden overflow-ellipsis">
            <p> {text}</p>
        </div>
    )
}