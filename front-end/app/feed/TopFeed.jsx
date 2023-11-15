import BlogCard from '@/components/BlogCard/BlogCard'
import FetchPostError from '@/components/Error/FetchPostError/FetchPostError'
import { useAppContext } from '@/context/useContextProvider'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function TopFeed() {

    const [topBlogs, setTopBlogs] = useState([])
    const [errorMessage, setErrorMessages] = useState('')
    const [retryFetchTopBlogs, setRetryFetchTopBlogs] = useState(false)
    const [sortedBy, setSortedBy] = useState(true)
    const [sorteByDate, setSortedByDate] = useState(false)
    const {currentUser} = useAppContext()

    useEffect( () => {
        
        async function getTopBlogs() {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/top?user_id=${currentUser ? currentUser?._id : null}`, {method: "GET"});
                const data = await response.json()
                
                if (data.status === "success") setTopBlogs(data.data)
                
                else if (data.status === "failed") setErrorMessages("There was a problem fetching posts!")
                
                else setErrorMessages("server error while fethcing posts")
            } 
            catch(e) {
                console.log('error in while getting feeds', e);
                setErrorMessages("There was a problem fetching posts!")
                setTopBlogs([])
            }
        }
        getTopBlogs()
    }, [retryFetchTopBlogs])

    const handleRetryFetchTopBlogs = () => {
        setRetryFetchTopBlogs(prev => ! prev)
        setErrorMessages("")
    }

    const handleSortedBy = () => {
        
        setSortedBy(prev => ! prev)

        sortedBy 
        ?
            setTopBlogs(topBlogs => topBlogs.sort( (a, b) => a.viewCount > b.viewCount))
        :
            setTopBlogs(topBlogs => topBlogs.sort( (a, b) => b.viewCount > a.viewCount))
    }

    if (! topBlogs?.length) return <div className="flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
        {
          errorMessage ? <div className=" w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
                
                <div className="shadow-white shadow-sm p-2 -translate-y-[30%]  rounded-md  w-screen flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                
                    <button 
                        type="button" 
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                        onClick={handleRetryFetchTopBlogs}   
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

    const handleSortPostsByDate = () => {
        
        setSortedByDate(prev => ! prev)

        setTopBlogs( topBlogs => {
            
            const sortedByDatePosts = topBlogs.slice().sort( (a, b) => {
                const firstDate = new Date(a.createdAt)
                const secondDate = new Date(b.createdAt)
                return sorteByDate ? firstDate > secondDate : secondDate > firstDate
            })

            return sortedByDatePosts
        })
    }
    return (
        <>
            {
            
            errorMessage ?
                
                null :
                
                <div className={`flex items-center justify-start mt-4 gap-x-4 md:ml-0 ml-2`}>
                
                    <div onClick={handleSortedBy} className="p-2 shadow-black/50 mt-4 z-[99] hover:cursor-pointer shadow-sm bg-white rounded-full">
                
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                    </div>
                
                    <span className={` mt-4`}> Sorted By: {sortedBy ? "By most viewed" : "By less viewd"}</span>
                    <button
                        type="button" 
                        className={`${sorteByDate ? "py-1 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white transition-all text-lg": "py-1 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-500 text-white transition-all text-lg"}`}
                        onClick={handleSortPostsByDate}
                    > SortByDate
                    </button>
                </div>
            }
            <div className="md:w-fit w-screen">
                {
                    topBlogs.map(blog => <BlogCard saved={blog?.saved} dateDistance={blog.distance} viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>)
                }
            </div>
        </>
    )
}
