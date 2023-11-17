import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import SearchBlogsBasedProps from '../SearchInput/SearchBlogsBasedProps'
import SavedToAccountPostCard from '../BlogCard/SavedToAccountBlogCard'

export default function SavedPosts() {

    const [savedPosts, setSavedPosts] = useState(undefined)
    const [errorMessages, setErrorMessages] = useState('')
    const [retrySavedPosts, setRetrySavedPosts] = useState(false)
    const [sortedBy, setSortedBy] = useState("")

    useEffect( () => {
        
        async function getSavedPostsOfUser() {
    
            try {
                
                const response = await fetch(`http://localhost:3001/blogRoutes/posts_saved`, 
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json()
                if (data.message === "success") {
                    setSavedPosts(data.data)

                    if (data?.isSortedByViewCount) setSortedBy("most viewd")
                    else setSortedBy("least viewed")
                
                }
                else if (data.message === "zeroSaved") setSavedPosts([])
                else if (data.status) setErrorMessages("Server error happened")
                
            }
            catch(e) {
                console.error('error in while getting your saved posts', e);
                setErrorMessages("Network error Try Again")
                setSavedPosts(undefined)
            }
        }
        getSavedPostsOfUser()
    }, [retrySavedPosts])

    const reverseSavedPosts = () => {
        
        setSavedPosts([...savedPosts].reverse())
        
        setSortedBy(prev => prev === "least viewed" ? "most viewed" : "least viewed")
    }

    const handleRetrySavedPosts = () => {
        setRetrySavedPosts(prev => !prev)
        setErrorMessages("")
    }

    let noSavedPosts = 
        <div className="mx-auto w-full"> 
            <h1 className="text-5xl font-extrabold mb-10 "> You haven't saved a post yet</h1>
            <p> Some posts you had saved might have been deleted by their owners.</p>
            <Link className="mt-10 text-gray-600 hover:text-black" href={"/feed"}> See posts </Link>
        </div>

    if (savedPosts === undefined) {

        return (

            <div className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
                {
                
                    errorMessages ? <div className="h-screen w-full flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
                    
                            <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                            
                                <button 
                                    type="button" 
                                    className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                                    onClick={handleRetrySavedPosts}   
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
                        </div>
                    : <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>
                }
            </div>
        )
    }

    return (
        <div className="w-[70%] ml-10">
            
            {
                savedPosts.length >= 1
                ?

                    <div className="">
                        <h1 className="md:text-4xl text-xl  font-bold tracking-wide mt-10 md:mt-0"> Your Saved Posts ({savedPosts.length})</h1>
                        
                        <div className="flex items-center justify-start mt-4 gap-x-4">
                            <div onClick={reverseSavedPosts} className="p-2 shadow-black/50 mt-4 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                            </div>
                            <span className="mt-4"> Sorted By: {sortedBy}</span>
                        </div>
                        
                        <div className="mt-10 w-full">
                            <SearchBlogsBasedProps blogs={savedPosts}/>
                        </div>
                    </div>
                : noSavedPosts
            }
            
            <div className="mt-10"></div>
                {
                
                    savedPosts.map(blog => <SavedToAccountPostCard refechSavedListRefreshFunction={setRetrySavedPosts} savedAt={blog.savedAt} savedDifference={blog.savedAtDifference} saved={blog?.saved} dateDistance={blog.distance} viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>)
                }
        </div>
    )
}
