import React, { useState } from 'react'
import DeleteCommentConfirmation from './DeleteConfirmationModal'
import UpdateComment from './UpdateComment'

export default function CommentUD({comment_id, body}) {
    
    const [modal, setModal] = useState(false)
    const [updateCommentModel, setUpdateCommentModal] = useState(false)

    return (
        <>
            <div className="absolute right-10 top-0">
                
                <div className="flex items-center gap-x-2">

                    <button 
                        className=" px-2 py-1  bg-blue-700 text-white rounded-lg h-8 md:h-10 flex items-center justify-center relative"
                        onClick={() => setUpdateCommentModal(true)}
                    >
                        Edit
                    </button>
                    
                    <button className=" px-2 py-1 bg-red-700 text-white rounded-lg h-8 md:h-10 flex items-center justify-center relative"
                        onClick={() => setModal(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="absolute w-[10rem]">
                {
                    modal ? <DeleteCommentConfirmation id={comment_id} func={setModal} mod={modal} /> : null
                }
                {
                    updateCommentModel ? <UpdateComment id={comment_id} body={body} func={setUpdateCommentModal} mod={updateCommentModel} /> : null
                }
            </div>
        </>
    )
}
