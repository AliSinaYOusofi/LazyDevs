import React from 'react'

export default function Avatar({profileUrl}) {

    return (
        <div className="flex items-center justify-center gap-x-2 ml-2">

            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
            </div>
            
            <div className="cursor-pointer">
                <img
                    src={profileUrl}
                    alt="user profile image"
                    className="object-contain  w-10 h-10 md:shadow-sm lg:shadow-mdr shadow-black/20 md:p-1 rounded-full "
                />
            </div>
        </div>
    )
}
