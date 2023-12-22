import { useAppContext } from '@/context/useContextProvider';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';


function ProfileCard({ followers, posts, following, image, name, work, user_id, isFollowing, date, diff, setTriggerParent}) {

    const [spinner, setSpinner] = useState()
    const [alreadyFollows, setAlreadyFollows] = useState()
    const {currentUser} = useAppContext()


    useEffect( () => {
        setAlreadyFollows(isFollowing)
    }, [isFollowing])
    
    const handleFollowButton = async () => {

        setSpinner(true)
        
        try {
            const response = await fetch(`http://localhost:3001/blogRoutes/follow?to_followed_user=${user_id}`, 
                {
                    method: "GET",
                    credentials: "include"
                }   
            );
            const data = await response.json()

            if (data.message === "following" || data.message === "new") {
                setAlreadyFollows(true)
            } else if (data.message === "unfollowing") {
                setAlreadyFollows(false)
            }
        }
        
        catch(e) {
            console.error("Error!! following a user", e)
        }
        
        finally {
            setSpinner(false)
            setTriggerParent(prev => ! prev)
        }
    }
    return (
        <div className="w-full group mt-10 flex md:flex-row flex-col flex-wrap items-center justify-between rounded-md md:px-10  p-4 bg-white">
            
            <div className=" flex items-center justify-start gap-x-4">
                
                <div className="border-[1px] border-black rounded-full">
                    <img className="rounded-full w-20 h-20 object-cover p-1" src={image} alt="Avatar" />
                </div>
                
                <div>
                    <div className=" ">
                        <Link href={`/account/${user_id}`} className="md:text-xl text-black transition-all hover:underline">{name || "username"}</Link>
                    </div>

                    <div className=" ">
                        <h4 className="md:text-lg text-gray-500">{work || "NA"}</h4>
                    </div>
                </div>
            </div>
            

            <div className="mt-6 mb-3 flex gap-4">
                
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-normal text-gray-600">Posts</p>
                    <p className="text-2xl font-bold text-gray-500">{posts || 0}</p>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-normal text-gray-600">Followers</p>
                    <p className="text-2xl font-bold text-gray-500">{followers || 0}</p>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-normal text-gray-600">Following</p>
                    <p className="text-2xl font-bold text-gray-500">{following ||0}</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-normal text-gray-600 mb-2">Joined</p>
                    <p className="text-xs font-bold text-gray-500"> { date ? date.split("T")[0] : null} <span className="text-xs"> ({diff})</span></p>
                </div>
            </div>

            <div>
                {
                    user_id === currentUser?._id ?
                    <button
                        disabled
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-white text-black ml-10" 
                    >
                        You
                    </button>
                    :
                    <button 
                        disabled={spinner} 
                        type="button"
                        onClick={handleFollowButton} 
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900">
                        {
                            alreadyFollows
                            ? "Unfollow"
                            : "Follow back"
                        }
                        {
                            spinner 
                            ?
                            <div className="border-t-transparent border-solid animate-spin  rounded-full border-white border-2 h-6 w-6"></div>
                            : null
                        }
                    </button>
                }
            </div>
        </div>
  );
}

export default ProfileCard;
