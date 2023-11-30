"use client"
import Followers from '@/components/Followers/Followers'
import FollowersIcon from '@/components/SVG/Followers'
import PostsIcon from '@/components/SVG/PostsIcon'
import React, {useState, useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Following from '@/components/Followers/Following'
import UserHomePosts from './UserHomePosts'
import UserFollowers from '../Followers/UserFollowers'
import UserFollowing from '../Followers/UserFollowing'

export default function UserHomePage({user_id}) {
    
    const [activeListItem, setActiveListItem] = useState(0)
    const [currentComponent, setCurrentComponent] = useState()
    const router = useRouter()

    let liArray = [ "Posts",  "Followers", "Following"]
    let liIconMapping = [ <PostsIcon />, <FollowersIcon />, <FollowersIcon />]
    let components = [ <UserHomePosts author={user_id}/>, <UserFollowers user_id={user_id}/>, <UserFollowing user_id={user_id}/>]

    const handleListItemClick = (index) => {
        setActiveListItem(index)
        setCurrentComponent(components[index])
    }

    const similarClass = "flex items-center justify-start transition-all duration-200 cursor-pointer hover:translate-x-2 py-2 px-2 rounded-r-md mt-2 gap-x-2"
    const menuItems = liArray.map( (li, index) => 
        <li 
            className={`${activeListItem === index  ? `${similarClass} shadow-inner border-l-2 border-black`: `${similarClass}`}`} 
            
            key={index} 
            
            onClick={() => handleListItemClick(index)}>
            {liIconMapping[index]}
            {li}
        </li> 
    );
    
    useEffect( () => {
        
        const checkUser = async () => {

            try {

                const response = await fetch(`http://localhost:3001/userRoutes/check`, 
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    }
                );
                
                const data = await response.json()
    
                if (data.redirectTo) {
                    const redirectTo = data.redirectTo
                    router.replace(`http://localhost:3000${redirectTo}`)
                }
            } catch(e) {
                console.error("error my account")
            }
        }
        checkUser()
        if (!currentComponent) setCurrentComponent(components[activeListItem])
        return () => setCurrentComponent(components[0])
    }, [])
    
    return (
        <>
            <div className="w-full relative md:h-screen gap-x-4 flex flex-col items-start justify-center mx-uto mt-20">
                
                <div className=" w-full  px-4 md:px-0">
                    
                    <ul className="flex justify-evenly">
                        {menuItems}
                    </ul>
                </div>
                
                <div className="px-10 mx-auto flex flex-col items-start justify-start mt-10 md:w-[60%] w-[100%] h-[100%]">
                    {currentComponent}
                </div>
            </div>
        </>
  )
}
