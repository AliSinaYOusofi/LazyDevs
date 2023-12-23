import React from 'react'
import CopyToClipBoard from './CopyToClipBoard'
import Link from 'next/link'
import CommentUD from './CommentUD'
import { useAppContext } from '@/context/useContextProvider'

export default function DisplayReplyComments({author, comment, _id, profileUrl, date, distance, comment_id}) {

    const {currentUser} = useAppContext()
    const [displayCommentUPOpe, setDisplayCommentUPOpe] = React.useState(false)

    console.log(comment_id)
    return (
        <>
        <div id={_id} key={_id} className="max-w-2xl  mt-10 p-4 ml-24 bg-white rounded-xl outline-none">
            
            <div className="flex flex-row mt-3 justify-between">

                <div className="flex items-center ">
                    <img src={profileUrl} alt="" className="w-10 h-10 rounded-full ml-2 object-cover" />
                    <Link href={{pathname: `/account/${_id}`}} className="ml-2 flex font-light items-center text-sm md:text-xl">{author}</Link>
                    <p className="ml-4 md:text-base text-sm font- font-extralight flex items-center">{date ? date.split("T")[0] : "NA"}<i className="md:text-sm  font-extralight text-xs text-gray-600 ml-1"> ({distance}) </i></p>
                </div>

                <div className="relative">
                        {
                            currentUser?._id === _id
                            ?
                            <div 
                                onClick={() => setDisplayCommentUPOpe(prev => ! prev)}
                                className="p-1 rounded-full transition-all duration-300 hover:bg-neutral-100"
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                                </svg>
                            </div>
                            : null
                        }

                        { // TODO make the CommentUD reusable
                            displayCommentUPOpe && <CommentUD comment_id={comment_id} body={comment} isReply={true}/>
                        }
                    </div>
            </div>

            <div className="w-full flex items-center justify-between">
                    <p className="ml-4 mt-4">{comment}</p>
                    <CopyToClipBoard content={comment}/>
            </div>
        </div>
        </>
    )
}
