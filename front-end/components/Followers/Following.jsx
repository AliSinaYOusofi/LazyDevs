import React, {useState, useEffect} from 'react'
import ProfileCard from './FollowersCard'
import UserCard from '../UserInfoCard/UserCard'
import Link from 'next/link'
import SortUsers from '@/app/search/SortUsers'

// users the user is following
export default function Following () {

    const [followers, setFollowers] = useState(undefined)
    const [spinner, setSpinner] = useState(false)
    const [error, setError] = useState(false)
    const [retryFollowers, setRetryFollowers] =  useState(false)
    
    useEffect( () => {
        
        async function getFollowers() {
            try {
                
                setSpinner(true)
                const response = await fetch(`http://localhost:3001/blogRoutes/get_following`, 
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
                const data = await response.json()
                
                if (data.message === "success" && data.data === "zero") {
                    setFollowers([])
                } 
                
                else if (data.message === "success") {
                    setFollowers(data.data)
                } 
                
                else if (data.message === "user not found") {
                    setError(true)
                } 
                
                else {
                    setError(true)
                }
            } 
            catch(e) {
                console.error('error in while followers list', e);
                setError(true)
            } finally {
                setSpinner(false)
            }
        }
        getFollowers()
    }, [retryFollowers])

    const handleRetryFollowersList = () => {
        setError(false)
        setRetryFollowers(prev => ! prev)
    }

    if (followers === undefined) {
        return (
            <div className=" flex items-center justify-center mx-auto right-[50%] mt-[4rem]">
            
                {
                
                    error ? <div className="h-screen w-full flex items-center justify-center flex-col text-center  mx-auto text-4xl font-semibold mb-10 text-black ">
                    
                            <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                            
                                <button 
                                    type="button" 
                                    className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                                    onClick={handleRetryFollowersList}   
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

    if (error) {
        return(

            <div className="p-2  rounded-md  flex flex-col justify-center items-center mx-auto mb-10 text-black">                   
                <button 
                    type="button" 
                    className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                    onClick={handleRetryFollowersList}   
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
        )
    }

    let noFriendsDiv = <div className="mx-auto w-full mt-20">
        <h1 className="md:text-2xl text-xl mb-10  font-bold tracking-wide mt-10 md:mt-0 italic md:ml-0 ml-10"> Follow some authors to see their blogs in your feed</h1>
        <Link href="/feed" className=""> Check posts</Link>
    </div>
    
    return (
        <>
            <h1 className="md:text-4xl text-xl  font-bold tracking-wide mt-10 md:mt-0 italic md:ml-0 ml-10"> Following : {followers.length}</h1>
            
            {
                !followers.length ? noFriendsDiv : <SortUsers setSortedBy={setFollowers} />
            }
            <div className="w-full md:mt-0 mt-10 flex flex-row iems gap-x-2 flex-wrap md:items-start md:justify-start items-center justify-center">
                {
                    followers.
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
