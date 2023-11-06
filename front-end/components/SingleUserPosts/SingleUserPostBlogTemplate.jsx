import React, { useState } from 'react'
import ModalComponent from './DeletePostOption'
import Link from 'next/link'

export default function SingleUserPostBlogTemplate({title, date, viewCount, commentCount, dateDifference, id, parentUseEffectTrigger}) {
    
    const [modal, setModal] = useState(false)

    const handleOpenModal = () => {
        setModal(prev => !prev)
    }

    return (
        
        <>
            <hr/>
            <div id={id} className="w-full flex flex-col md:flex-row md:items-center justify-between mt-3 mb-3">
                <div className="md:w-1/2 w-full">
                    <Link href={{ pathname:"/view_post", query: {post: id} }} className="md:text-2xl text-xl line-clamp-2 hover:underline  font-bold tracking-wide">{title}</Link>
                    <p className="mt-4 md:text-base text-sm">{date ? date.split("T")[0] : ""} <i className="md:text-sm text-xs text-gray-600"> ({dateDifference}) </i></p>
                </div>

                <div className="flex flex-row items-center gap-x-4 md:mt-0 mt-4">

                    <div className="flex items-center gap-x-1">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {viewCount}
                    </div>

                    <div className="flex items-center gap-x-1">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        {commentCount || 0}
                    </div>

                </div>
                {/* options available for the post */}
                <div>
                    <button className="md:h-10 h-8 px-5 text-blue-100 outline-none border-none transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"> Stats </button>
                    <button onClick={handleOpenModal} className="md:h-10 outline-none border-none h-8 px-5 mt-2 ml-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"> Delete </button>
                </div>
            </div>
            <hr />

            {/* if postDelete pressed show the options */}
            {
                modal ? <ModalComponent refechPosts={parentUseEffectTrigger} func={setModal} mod={modal} id={id}/> : null
            }
        </>
    )
}