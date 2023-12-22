import React, { useState } from 'react'
import DeleteCommentConfirmation from './DeleteConfirmationModal'

export default function CommentUD({comment_id}) {
    
    const [modal, setModal] = useState(false)

    return (
        <>
            <div className="absolute right-10 top-0">
                
                <div className="flex items-center gap-x-2">

                    <button 
                        className=" px-2 py-1  bg-blue-700 text-white rounded-lg h-8 md:h-10 flex items-center justify-center relative"
                        
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
            </div>
        </>
    )
}
