import BlogCard from '@/components/BlogCard/BlogCard'
import SortData from '@/components/Sort/SortData'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function TopFeed() {

    const [topBlogs, setTopBlogs] = useState([])
    const [errorMessage, setErrorMessages] = useState('')
    const [retryFetchTopBlogs, setRetryFetchTopBlogs] = useState(false)
    // const [sortedBy, setSortedBy] = useState(true)
    // const [sorteByDate, setSortedByDate] = useState(false)

    useEffect( () => {
        
        async function getTopBlogs() {
            try {
                const response = await fetch(`http://localhost:3001/blogRoutes/top`, {method: "GET", credentials: "include"});
                const data = await response.json()
                
                if (data.status === "success") setTopBlogs(data.data)
                
                else if (data.status === "failed") setErrorMessages("There was a problem fetching posts!")
                
                else setErrorMessages("server error while fethcing posts")
            } 
            catch(e) {
                console.error('error in while getting feeds', e);
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

    // const handleSortedBy = () => {
        
    //     setSortedBy(prev => ! prev)

    //     sortedBy 
    //     ?
    //         setTopBlogs(topBlogs => topBlogs.sort( (a, b) => a.viewCount > b.viewCount))
    //     :
    //         setTopBlogs(topBlogs => topBlogs.sort( (a, b) => b.viewCount > a.viewCount))
    // }

    if (! topBlogs?.length) return <div className="flex h-screen items-center justify-center mx-auto right-[50%] mt-[4rem]">
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

    // const handleSortPostsByDate = () => {
        
    //     setSortedByDate(prev => ! prev)

    //     setTopBlogs( topBlogs => {
            
    //         const sortedByDatePosts = topBlogs.slice().sort( (a, b) => {
    //             const firstDate = new Date(a.createdAt)
    //             const secondDate = new Date(b.createdAt)
    //             return sorteByDate ? firstDate > secondDate : secondDate > firstDate
    //         })

    //         return sortedByDatePosts
    //     })
    // }
    return (
        <>
            {
            
            errorMessage ?
                
                null :
                
                <div className={`flex items-center justify-start mt-4 gap-x-4 md:ml-0 ml-2`}>
                
                    <SortData sortedBy={topBlogs} setSortedBy={setTopBlogs} />
                </div>
            }
            <div className="md:w-fit w-screen px-4">
                {
                    topBlogs.map(blog => <BlogCard tags={blog?.tags} saved={blog?.saved} dateDistance={blog.distance} viewCount={blog.viewCount} title={blog.title} content={blog.body} username={blog.username} profileUrl={blog.profileUrl} date={blog.createdAt} key={blog._id} id={blog._id}/>)
                }
            </div>
        </>
    )
}
