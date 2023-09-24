"use client";

import PostText from '@/components/PostText/PostText';
import { useSearchParams } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'

export default function layout({children}) {
    
    const post_id = useSearchParams().get("post");
    const [currentBlog, setCurrentBlog] = useState([{}])
    
    useEffect( () => {
        
        const getCurrentBlog = async () => {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/single_post/:${post_id}`, {method: "POST"});
                const data = await response.json()
                setCurrentBlog(data.data)
                console.log(data.data)
            }
            catch(e) {
                console.log("error while fetching data", e)
            }
        }

        getCurrentBlog();
    }, [])

    return (
        <div className="w-[100%]">

            <Navbar />
            <h1 className="mb-4 ml-6 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl">{currentBlog ? currentBlog.title : ""}</h1>
            {
                currentBlog ? currentBlog.body?.split("\n").map( (line, index) => line.startsWith("![]") ? <img src={line} alt=""  /> : <PostText key={index}  text={line}/>) : ""
            }
            {children}
        </div>
    )
}
