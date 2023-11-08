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
            console.log("Error! posting comment: %s", error);
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
                    const extractedComments = data.data.map(comms => comms.comment).flat()
                    const extractedReplies = data.data.map(reps => reps.replies).flat()
                    setCommentReplies(extractedReplies)
                    setPostComments(extractedComments)
                } 
                
                else if (data.status === "failed") setErrorMessages("Failed to get post comments")
                
                else if (data.data === "blogNotFound") setErrorMessages("Blog not found")
            }
            
            catch(e) {
                console.log("error while fetching comments", e)
                setErrorMessages("failed to get post comments")
            }

            console.log(commentReplies)
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
                    
                        <RecentPostsError error={errorMessage} />
                    
                        <button onClick={handleRetryFetchPostComments} className="mt-10 flex group items-center justify-center  px-2 py-1 text-lg text-gray-100 transition-colors duration-150 bg-gray-700 rounded-sm focus:shadow-outline hover:bg-gray-800"> 
                    
                            <span className="mr-2">Try again</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group group-hover:animate-spin">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
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
                            
                    <button onClick={handleSumitComment} className="bg-neutral-50 px-6 py-3  hover:bg-neutral-300 rounded-md 
                        flex items-center justify-center relative"
                        disabled={commentSuccessful}>
                        Comment
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
                    <h1 className="text-3xl font-bold tracking-wide mt-10"> Comments </h1>
                    {
                        postComments?.length === 0
                        ?
                        <h1 className="text-3xl font-bold tracking-wide mt-10 text-gray-300"> No Comments Yet. Post a comment to start a conversation </h1>
                        : null
                    }

                    {postCommentsErrorHandler}
                    
                    {
                        postComments?.map(comment => <DisplayComments updateComments={commentReplyPosted} commentReplies={commentReplies} post_id={post_id} distance={comment.distance} _id={comment?._id} key={comment?._id} author={comment.username} comment={comment.body} date={comment.commentedOn} profileUrl={comment.profileUrl} />)
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
