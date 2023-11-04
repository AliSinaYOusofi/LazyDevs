import React, { useState } from 'react'
import ModalComponent from './DeletePostOption'

export default function SingleUserPostBlogTemplate({title, date, viewCount, commentCount, dateDifference, id}) {
    
    const [modal, setModal] = useState(false)

    return (
        
        <>
            <div className="w-full flex flex-row items-center justify-between">
                <div>
                    <h1 className="text-3xl  font-bold tracking-wide">{title}</h1>
                    <p className="mt-4">{date ? date.split("T")[0] : ""} <i className="text-sm text-gray-600"> ({dateDifference}) </i></p>
                </div>

                <div className="flex flex-row items-center gap-x-4">

                    <div className="flex items-center gap-x-1">
                        
                        {viewCount}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    <div className="flex items-center gap-x-1">
                        
                        {commentCount || 0}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                    </div>

                </div>
                {/* options available for the post */}
                <div>
                    <button className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"> Stats </button>
                    <button onClick={() => setModal(prev => !prev)} className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"> Delete </button>
                </div>
            </div>

            {/* if postDelete pressed show the options */}
            <ModalComponent />
        </>
    )
}
