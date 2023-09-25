import React from 'react'

export default function PostText({text}) {
    return (
        <div className="text-black px-8  font-serif text-xl md:ml-0 ml-10">
            <p> {text}</p>
        </div>
    )
}