import { useAppContext } from '@/context/useContextProvider'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import DisplayReplyComments from './DisplayReplyComments'
import HiddenReplySmallPortion from './HiddenReplySmallPortion'
import CopyToClipBoard from './CopyToClipBoard'
import NotLoggedInCard from '../NotLoggedCard/NotLoggedInCard'
import Link from 'next/link'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export default function DisplayComments({author, comment, _id, profileUrl, date, distance, post_id, commentReplies, updateComments, author_id}) {
    
    const [replyCommentValue, setReplyCommentValue] = useState("")
    const [replyCommentSuccessful, setReplyCommentSuccessful] = useState(false)
    const [showCommentReplyTextArea, setShowCommentReplyTextArea] = useState(false)
    const [replyHidden, setReplyHidden] = useState(false)
    const [showNotLoggedInCard, setNotLoggedInCard] = useState(false)
    const {currentUser} = useAppContext()

    const handleReplyComment = async () => {

        if (!currentUser) return alert("not logged in ")
        
        setReplyCommentSuccessful(prev => ! prev)
        
        try {
            
            const requestData = { 
                post_id, 
                reply : replyCommentValue, 
                comment_id: _id,
                user_id: currentUser._id
            }

            const response = await fetch(`http://localhost:3001/blogRoutes/save_comment_reply`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestData),
                    credentials: "include"
                }
            );
                
                const data = await response.json()
                
                if (data.status === "success") {
                    toast.success("Reply posted")
                    updateComments(prev => !prev)
                }
        } 
            
        catch (e) {
            console.warn(e)
            toast.error("Failed to post reply comment") 
        }
        
        setReplyCommentValue("")
        setReplyCommentSuccessful(prev => ! prev)
    }

    const handleReplyCommentValue = () => {
        if (document.getElementById(_id).style.display === "none") {
            document.getElementById(_id).style.display = 'block'
            setReplyHidden(false)
        }
        else {
            document.getElementById(_id).style.display = 'none'
            setReplyHidden(true)
        }
    }

    const handleShowReplyTextArea = () => {

        if (!currentUser) {
            setNotLoggedInCard(prev => ! prev)
        } else {
            setShowCommentReplyTextArea(true)
        }
    }
    return (
        <>
            <div key={_id} className="max-w-2xl mt-10  rounded-md p-4 bg-white">
            
                <div className="flex flex-row mt-3">
                    <img src={profileUrl} alt="" className="w-10 h-10 rounded-full ml-2 object-cover" />
                    <Link href={{pathname: `/account/${author_id}`}} className="ml-2 flex font-light items-center text-sm md:text-xl">{author}</Link>
                    <p className="ml-4 md:text-base text-sm font- font-extralight flex items-center">{date ? date.split("T")[0] : "NA"}<i className="md:text-sm  font-extralight text-xs text-gray-600 ml-1"> ({distance}) </i></p>
                </div>

                <div className="w-full flex items-center justify-between">
                    <p className="ml-4 mt-4">{comment}</p>
                    <CopyToClipBoard content={comment}/>
                </div>
            </div>

            <div className="flex items-center justify-start">

                <button 
                    onClick={handleShowReplyTextArea}
                    className="mt-2 gap-x-2 flex items-center md:h-10 h-8 px-3 outline-none border-none transition-colors duration-150 hover:bg-gray-800 hover:text-white rounded-md"
                > 
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                    </span>
                    Reply
    
                </button>

                {
                    commentReplies?.length >= 2
                    ?
                    <div onClick={handleReplyCommentValue} className="mt-3 ml-3 transition-all duration-200 border-black border-[1px] rounded-full p-1 flex items-center">
                        {
                            replyHidden
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                            </svg>
                        }
                        <span className="text-gray-500">hide/unhide replies</span>
                    </div>
                    : null
                }

                {/* <div >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div> */}
            </div>

            {/* the text area for reply */}
            {
                showCommentReplyTextArea
                ? 
                    <div className="ml-4">

                        <div className="w-full mt-4">
                            <textarea 
                                placeholder='reply'
                                className={`${roboto.className} w-full bg-white   border-black/40 focus:border-[1px] rounded-md outline-none p-2`}
                                rows={4}
                                value={replyCommentValue}
                                onChange={(e) => setReplyCommentValue(e.target.value)}
                            >

                            </textarea>
                        </div>

                        <div className="mt-2 flex">
                            
                            <button
                                disabled={replyCommentValue.length === 0}
                                onClick={handleReplyComment}
                                 
                                className={`${replyCommentValue.length ? "cursor-pointer": "cursor-not-allowed"} flex items-center justify-center gap-x-2 md:h-10 h-8 px-5 text-white outline-none border-none transition-colors duration-150 bg-gray-800 rounded-lg  hover:bg-gray-900`}
                            > 
                                Submit
                                {
                                    replyCommentSuccessful
                                    ? <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-400 border-2 h-5 w-5"></div>
                                    : null
                                } 
                            </button>
                            
                            <button 
                                className="md:h-10 ml-2 h-8 px-5 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-300" onClick={() => setReplyCommentValue("")}> 
                                clear 
                            </button>

                            <button
                                onClick={() => setShowCommentReplyTextArea(false)} 
                                className="md:h-10 ml-2 h-8 px-5 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-300"> 
                                Dismiss 
                            </button>
                        </div>
                    </div>
                : null 
            }

            <div id={_id}>
                {
                    
                    commentReplies?.map(comment => 
                        comment.commen_id === _id ?
                        <DisplayReplyComments 
                            post_id={post_id} 
                            distance={comment.distanceToNow} 
                            _id={comment?._id} 
                            key={comment?._id} 
                            author={comment.username} 
                            comment={comment.body} 
                            date={comment.date} 
                            profileUrl={comment.profileUrl} 
                        />
                        
                        : null
                    )
                }
            </div>

            {/* {
                replyHidden ? <HiddenReplySmallPortion body={"replies hidden"}/> : null
            } */}

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
        </>
    )
}
