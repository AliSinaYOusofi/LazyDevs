import BlogCard from '@/components/BlogCard/BlogCard'
import ProfileCard from '@/components/Followers/FollowersCard'
import SortData from '@/components/Sort/SortData'
import React, { useState, useCallback, useEffect} from 'react'
import NotFoundDiv from './NotFoundDiv'
import SortUsers from './SortUsers'

export default function UsersSearchResult({query}) {
    
    const [error, setError] = useState()
    const [users, setUsers] = useState(undefined)
    const [retry, setRetry] = useState(false)


    const fetchUserProfileSearch = useCallback( async () => {
        
        try {
            const response = await fetch(`http://localhost:3001/blogRoutes/search_users?user=${encodeURIComponent(query)}`, {
                method: "GET",
                credentials: "include"
            })

            const json = await response.json()
            
            console.log(json)
            
            if (json.message === "success" && !json.zero) {
                setUsers(json.data)
            }
            else if (json.zero || json?.data?.length === 0) setUsers("zero")
            else if (json.message === "failed") setError(true)


        } catch( e ) {
            console.error("error while searcing for users", e)
            setError(true)
        }
    }, [query])

    useEffect(() => {
        fetchUserProfileSearch()
    }, [fetchUserProfileSearch, retry])

    if (users === "zero") return <NotFoundDiv />
    
    if (! users?.length && users !== "zero") return <div className="flex h-screen items-center justify-center mx-auto right-[50%] mt-[4rem]">
        {
            error ? <div className=" w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
                
                <div className="shadow-white shadow-sm p-2 -translate-y-[30%]  rounded-md  w-screen flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                
                    <button 
                        type="button" 
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                        onClick={() => setRetry(prev => ! prev)}   
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
    
    return (
        <>
            {
            
            error ?
                
                null :
                
                <div className={`flex items-center justify-start mt-4 gap-x-4 md:ml-0 ml-2`}>
                
                    <SortUsers setSortedBy={setUsers} />
                </div>
            }
            
            <div className="w-full px-4">
            
                {
                    users.
                        map(user => 
                            <ProfileCard 
                                image={user.profileUrl} 
                                name={user.username} 
                                work={user.work}
                                posts={user.numberOfPosts}
                                followers={user.numberOfFollowers}
                                following={user.numberOfFollowing}
                                user_id={user._id}
                                isFollowing={user.isFollowing}
                                date={user?.joined}
                                diff={user?.distance}
                            />
                        )
                }
            
            </div>
        </>
    )
}
