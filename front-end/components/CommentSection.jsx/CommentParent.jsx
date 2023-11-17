"use client";

import { useAppContext } from '@/context/useContextProvider';
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DisplayComments from './DisplayComments';
import RecentPostsError from '../Error/RecentPostsError/RecentPostError';
import NotLoggedInCard from '../NotLoggedCard/NotLoggedInCard';
import DisplayReplyComments from './DisplayReplyComments';

export default function CommentParent({post_id}) {

    const [comment, setComment] = useState("")
    const [commentSuccessful, setCommentSuccessful] = useState(false)
    const [errorMessage, setErrorMessages] = useState("")
    const [postComments, setPostComments] = useState(undefined);
    const [retryFetchComments, setRetryFetchComments] = useState(false)
    const [showNotLoggedInCard, setNotLoggedInCard] = useState(false)
    const [commentReplies, setCommentReplies] = useState("")
    const [commentReplyPosted, setCommentReplyPosted] = useState(false)
    
    const {currentUser} = useAppContext(); 


    const handleSumitComment = async () => {
        
        if (!currentUser) {
           
            return setNotLoggedInCard(prev => ! prev)
        }
        
        
        if (comment.length < 1) return toast.error("can't post an empty comment", {pauseOnHover: true});

        setCommentSuccessful(prev => !prev);
        try {

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

            if (json.data === "saved") {
                toast.success("comment posted")
                setComment(" ");
                // window.location.reload()
            } else toast.error("failed to comment! try again")
        } catch (error) {
            console.error("Error! posting comment: %s", error);
            toast.error("failed to post comment");
        }
        setCommentSuccessful(prev => !prev);
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
                
                if (data?.data?.length === 0) {
                    setPostComments([])
                    setCommentReplies([])
                }
                
                else if (data.status === "success") {
                    const extractedComments = data.data.map(comms => comms.comment).flat().reverse()
                    const extractedReplies = data.data.map(reps => reps.replies).flat()
                    setCommentReplies(extractedReplies)
                    setPostComments(extractedComments)
                } 
                
                else if (data.status === "failed") setErrorMessages("Failed to get post comments")
                
                else if (data.data === "blogNotFound") setErrorMessages("Blog not found")
            }
            
            catch(e) {
                console.error("error while fetching comments", e)
                setErrorMessages("failed to get post comments")
            }
        }

        getPostComments();

        return () => setNotLoggedInCard(false)
    }, [commentSuccessful, post_id, retryFetchComments, commentReplyPosted])

    const handleRetryFetchPostComments = () => {
        setRetryFetchComments(prev => !prev)
        setErrorMessages("")
    }
    let postCommentsErrorHandler

    if (postComments === undefined) {
            postCommentsErrorHandler = <div className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
            {
            
            errorMessage ? <div key="commentData" className=" flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
            
                    <div className="p-2  rounded-md flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                    
                        <button 
                            type="button" 
                            className="py-1 h-8 text-lg font-light md:h-10 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                            onClick={handleRetryFetchPostComments}
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
    }

    return (
        <>
            <div id="comments" className="">
                <div className="mt-10 max-w-2xl mx- bg-inherit flex flex-col items-start justify-start
                gap-y-4 relative" id={"comment"}>
                
                    <textarea id="message" 
                        onChange={(e) => setComment(e.target.value)} 
                        rows="4" className="bg-neutral-50 border-none outline-none p-2.5 w-full text-xl text-gray-900 rounded-md" 
                        placeholder="your comment..." >
                    </textarea>
                            
                    <button onClick={handleSumitComment} className="bg-gray-800 px-5 py-3  hover:bg-gray-900 text-white rounded-lg h-8 md:h-10 
                        flex items-center justify-center relative"
                        disabled={commentSuccessful}>
                        Comment
                        {
                            commentSuccessful
                            ?
                            <div className="border-t-transparent border-solid animate-spin ml-1  rounded-full border-gray-400 border-2 h-5 w-5"></div>
                            :
                            null
                        }
                    </button>
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-wide mt-10"> Comments </h1>
                    {
                        postComments?.length === 0
                        ?
                        <h1 className="text-3xl font-bold tracking-wide mt-10 text-gray-300"> No Comments Yet. Post a comment to start a conversation </h1>
                        : null
                    }

                    {postCommentsErrorHandler}
                    
                    {
                        postComments?.map(comment => <DisplayComments updateComments={setCommentReplyPosted} commentReplies={commentReplies} post_id={post_id} distance={comment.distance} _id={comment?._id} key={comment?._id} author={comment.username} comment={comment.body} date={comment.commentedOn} profileUrl={comment.profileUrl} />)
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
            <ToastContainer />
        </>
    )
}
