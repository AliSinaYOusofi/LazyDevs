"use client";

import { useAppContext } from '@/context/useContextProvider';
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';

export default function CommentParent({post_id}) {

    const [comment, setComment] = useState(true);
    const [commentSuccessful, setCommentSuccessful] = useState(true);
    const {currentUser} = useAppContext(); 


    const handleSumitComment = async () => {
        
        if (comment.length < 1) return toast.error("can't post an empty comment", {pauseOnHover: true});

        try {

            console.log(comment, post_id, currentUser.email, 'body of the data');

            const data = {
                comment,
                post_id,
                author: currentUser.email
            }

            const response = await fetch("http://localhost:3001/blogRoutes/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            let json = await response.json();
            console.log(json);
            if (json.data === "saved") {
                setTimeout( () => setCommentSuccessful(prev => !prev), 2000);
            } else toast.error("failed to comment! try again")
        } catch (error) {
            console.log("Error! posting comment: %s", error);
            toast.error("failed to post comment");
        }
    }

    return (
        <div id="comments">
            <div className="mt-10 max-w-2xl mx- bg-inherit flex flex-col items-start justify-start
            gap-y-4 relative" id={"comment"}>
               
                <textarea id="message" 
                    onChange={(e) => setComment(e.target.value)} 
                    rows="4" className="bg-neutral-50 border-none outline-none p-2.5 w-full text-xl text-gray-900 rounded-md" 
                    placeholder="your comment..." >
                </textarea>
                        
                <button onClick={handleSumitComment} className="bg-neutral-50 px-6 py-3  hover:text-white hover:shadow-[inset_13rem_0_0_0] rounded-md hover:shadow-blue-400 duration-[400ms,700ms] transition-[color,box-shadow]
                flex items-center justify-center relative">
                    Comments
                    {
                        commentSuccessful
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        :
                        <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    }
                </button>
            </div>
        </div>
    )
}
