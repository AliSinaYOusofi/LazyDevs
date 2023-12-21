"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import NotLoggedInCard from '../NotLoggedCard/NotLoggedInCard'
import { useAppContext } from '@/context/useContextProvider'

export default function SearchInput() {
    
    const router = useRouter()
    const {currentUser} = useAppContext()
    const [showNotLoggedInCard, setNotLoggedInCard] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) router.push(`/search?q=${searchQuery}`)
    }

    const handleIfNotLoggedIn = () => {

        if (! currentUser) setNotLoggedInCard(prev => ! prev)
    }

    return (

        <>
            <form className="flex items-center justify-center">
                <div className="flex rounded-md bg-[#F3F8FF] outline-none">
                    <input 
                        type="text" 
                        className="px-4 py-2 w-80 bg-[#F3F8FF]" 
                        placeholder="Search..." 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        onKeyDown={handleKeyDown}
                        onFocus={handleIfNotLoggedIn}
                    />
                    <button className="flex items-center justify-center px-4 border-l">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                    </button>
                </div>
            </form>
            
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
