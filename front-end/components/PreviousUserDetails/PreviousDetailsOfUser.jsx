import React from 'react'

export default function PreviousDetailsOfUser({username, fullName, work, education, bio, profileUrl}) {

    return (
        <div className="border-[0.1px] ml-3 p-4 rounded shadow-sm bg-white absolute flex flex-col items-center justify-center">

            <div>
                <img src={profileUrl} alt="Profile" className="rounded-full w-20 h-20 object-cover mb-4" />
            </div>
            
            <div className="mb-2">
                <strong className="font-bold mr-2">Username:</strong> {username}
            </div>
            
            <div className="mb-2">
                <strong className="font-bold mr-2">Full Name:</strong> {fullName}
            </div>

            <div className="mb-2 flex items-center">
                <strong className="font-bold mr-2">Work:</strong> 
                {
                    work === null ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg> 
                    : work
                }
            </div>

            <div className="mb-2 flex items-center">
                <strong className="font-bold mr-2">Education:</strong> 
                {
                    education === null ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    : education
                }
            </div>

            <div className="mb-2 flex items-center">
                <strong className="font-bold mr-2">Bio:</strong> 
                {
                    bio === null ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    : bio
                }
            </div>
        </div>
    )
}
