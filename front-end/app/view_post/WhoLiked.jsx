import React, { useState, useCallback, useEffect } from 'react'
import LikerCard from './LikerCard'

export default function WhoLiked({post_id}) {
    
    const [likers, setLikers] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [retryLikersFetch, setRetryLikersFetch] = useState(false)

    const fetchLikers = useCallback( async () => {
        
        try {
            const response = await fetch(`http://localhost:3001/blogRoutes/get_likers?post_id=${post_id}`, 
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const json = await response.json()

            if (response.ok) {
                setLikers(json.data)
            }
            else {
                setError(true)
            }
        } 
        
        catch ( e ) {
            console.error("while getting likers ", e)
            setError(true)
        }
        
    }, [retryLikersFetch])

    useEffect( () => {
        fetchLikers()

    }, [retryLikersFetch])

    const handleRetry = () => {
        
        setRetryLikersFetch(prev => !prev)
        setError(false)
        setLikers(undefined)
    }

    if (likers === undefined) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                {
                    error
                    ? <div className="w-full h-full flex items-center justify-center">
                        
                    <button 
                        type="button" 
                        className="py-1 h-8 md:h-10 px-4 mt-2 inline-flex justify-center items-center text-lg font-light gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                        onClick={handleRetry}
                    >
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            className='w-7 h-7'
                            >
                            <path d="M256 48C141.31 48 48 141.32 48 256c0 114.86 93.14 208 208 208 114.69 0 208-93.31 208-208 0-114.87-93.13-208-208-208zm94 219a94 94 0 11-94-94h4.21l-24-24L256 129.2l59.8 59.8-59.8 59.8-19.8-19.8 27.92-27.92c-2.4-.08-5.12-.08-8.12-.08a66 66 0 1066 66v-14h28z" />
                        </svg>
                        Retry
                    </button>
                </div>
                : <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-400 border-2 h-7 w-7"></div>
                }
            </div>
        )
    }

    return (

        <>

            <h1 className="text-gray-800 text-2xl font-semibold mt-3"> Users who liked 💖 this post: {likers ? likers.length : 0}</h1>
            
            <div className="flex items-center mt-4 gap-x-2">
                <span>
                    Sort: 
                </span>
                
                <div className=" bg-white p-2 rounded-full" onClick={() => setLikers( likers => likers.slice().reverse())}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </div>
            </div>

            <div className=" max-w-2xl bg-white rounded-md mt-5 p-4">

                {
                    likers.length > 0
                    ?
                    likers.map((lover, index) => <LikerCard author_id={lover?._id} profileUrl={lover?.profileUrl} username={lover?.username} number={index} distance={lover?.likeDistance} date={lover?.date}/>)
                    : null
                }
            </div>
        </>
    )
}
