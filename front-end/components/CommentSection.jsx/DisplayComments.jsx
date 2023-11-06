import { useAppContext } from '@/context/useContextProvider'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function DisplayComments({author, comment, _id, profileUrl, date, distance, post_id}) {
    
    const [replyCommentValue, setReplyCommentValue] = useState("")
    const [replyCommentSuccessful, setReplyCommentSuccessful] = useState(false)
    const [showCommentReplyTextArea, setShowCommentReplyTextArea] = useState(false)
    const {currentUser} = useAppContext()

    const handleReplyComment = async () => {
        
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
                    body: JSON.stringify(requestData)
                }
                );
                
                const data = await response.json()
                if (data.status === "success") {
                    toast.success("Reply posted")
                }
            } 
            
            catch (e) {
                console.log("failed to post reply comment")
                console.warn(e)
                toast.error("Failed to post reply comment") 
            }
            
            setReplyCommentValue("")
            setReplyCommentSuccessful(prev => ! prev)
    }
    return (
        <>
            <div key={_id} className="max-w-2xl mt-10 border-2 border-gray-50 rounded-md p-4">
            
                <div className="flex flex-row mt-3">
                    <img src={profileUrl} alt="" className="w-10 h-10 rounded-full ml-2 object-cover" />
                    <p className="ml-2 flex font-light items-center text-sm md:text-xl">{author}</p>
                    <p className="ml-4 md:text-base text-sm font- font-extralight flex items-center">{date ? date.split("T")[0] : "NA"}<i className="md:text-sm  font-extralight text-xs text-gray-600 ml-1"> ({distance}) </i></p>
                </div>

                <p className="ml-4 mt-4">{comment}</p>
            </div>
            <button 
                onClick={() => setShowCommentReplyTextArea(true)}
                className="mt-2 gap-x-2 flex items-center md:h-10 h-8 px-3 outline-none border-none transition-colors duration-150 hover:bg-gray-800 hover:text-white rounded-md"
            > 
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                </span>
                Reply
 
            </button>

            {/* the text area for reply */}
            {
                showCommentReplyTextArea
                ? 
                    <div className="ml-4">

                        <div className="w-full mt-4">
                            <textarea 
                                placeholder='reply'
                                className="w-full bg-gray-50  focus:ring-1 ring-black border-black/40 outline-none p-2"
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
                                 
                                className={`${replyCommentValue.length ? "cursor-pointer": "cursor-not-allowed"} flex items-center justify-center gap-x-2 md:h-10 h-8 px-5 text-blue-100 outline-none border-none transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700`}
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
        </>
    )
}
