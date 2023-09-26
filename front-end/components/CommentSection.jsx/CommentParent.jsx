"use client";

import { useAppContext } from '@/context/useContextProvider';
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import DisplayComments from './DisplayComments';

export default function CommentParent({post_id}) {

    const [comment, setComment] = useState(true);
    const [commentSuccessful, setCommentSuccessful] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const {currentUser} = useAppContext(); 


    const handleSumitComment = async () => {
        
        setCommentSuccessful(prev => !prev);
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

            console.log(data);
            if (json.data === "saved") {
                setCommentSuccessful(prev => !prev);
            } else toast.error("failed to comment! try again")
        } catch (error) {
            console.log("Error! posting comment: %s", error);
            toast.error("failed to post comment");
        }
    }

    useEffect( () => {
        const getPostComments = async () => {
            
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/get_post_comments`, 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({post_id: post_id}),
                    },
                );
                
                const data = await response.json()
                
                if (data.status === "success") {
                    const extractedComments = data.data.map(comms => comms.comment).flat();
                    setPostComments(extractedComments);
                    toast.success("comment posted");
                } else if (data.status === "failed") {
                    toast.error("failed to post comments");
                } else {
                    toast.error("server error. try again")
                }


            }
            catch(e) {
                console.log("error while fetching comments", e)
            }
        }

        getPostComments();
    }, [commentSuccessful])

    return (
        <div id="comments">
            <div className="mt-10 max-w-2xl mx- bg-inherit flex flex-col items-start justify-start
            gap-y-4 relative" id={"comment"}>
               
                <textarea id="message" 
                    onChange={(e) => setComment(e.target.value)} 
                    rows="4" className="bg-neutral-50 border-none outline-none p-2.5 w-full text-xl text-gray-900 rounded-md" 
                    placeholder="your comment..." >
                </textarea>
                        
                <button onClick={handleSumitComment} className="bg-neutral-50 px-6 py-3  hover:bg-neutral-300 rounded-md 
                flex items-center justify-center relative"
                disabled={commentSuccessful}>
                    Comments
                    {
                        commentSuccessful
                        ?
                        <div className="border-t-transparent border-solid animate-spin ml-1  rounded-full border-gray-400 border-2 h-5 w-5"></div>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    }
                </button>
            </div>
            <div>
                {
                    postComments.map(comment => <DisplayComments author={comment.username} comment={comment.body} date={comment.commentedOn} profileUrl={comment.profileUrl} />)
                }
            </div>
        </div>
    )
}
