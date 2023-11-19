"use client"
import AccountDetails from '@/components/AccountDetails/AccountDetails'
import EditProfile from '@/components/EditProfile/EditProfile'
import Followers from '@/components/Followers/Followers'
import AnalyticsIcon from '@/components/SVG/AnalyticsIcon'
import EditProfileIcon from '@/components/SVG/EditProfile'
import FollowersIcon from '@/components/SVG/Followers'
import PostsIcon from '@/components/SVG/PostsIcon'
import ProfileIcon from '@/components/SVG/ProfileIcon'
import SavedPostIcon from '@/components/SVG/SavedPostIcon'
import SavedPosts from '@/components/SavedPosts/SavedPosts'
import PostOfUserBasedId from '@/components/SingleUserPosts/PostOfUserBasedId'
import { useAppContext } from '@/context/useContextProvider'
import React, {useState, useEffect} from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Page() {
    
    const [activeListItem, setActiveListItem] = useState(0)
    const [currentComponent, setCurrentComponent] = useState()

    const {currentUser} = useAppContext();

    let liArray = ["Profile", "Edit Profile", "Posts", "Saved", "Followers", ""]
    let liIconMapping = [<ProfileIcon />, <EditProfileIcon />, <PostsIcon />, <SavedPostIcon />, <FollowersIcon />]
    let components = [<AccountDetails />, <EditProfile />, <PostOfUserBasedId author={currentUser ? currentUser._id : null}/>, <SavedPosts />, <Followers />]

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
        if (!currentComponent) setCurrentComponent(components[activeListItem])

        return () => setCurrentComponent(components[0])
    }, [])

    return (
        <>
            <div className="w-full relative md:h-screen gap-x-4 flex flex-col md:flex-row items-start justify-center mx-uto mt-10">
                
                <div className="md:w-[20%] w-full md:ml-20 px-4 md:px-0 ">
                    
                    <ul className="">
                        {menuItems}
                    </ul>
                </div>
                
                <div className="md:w-[70%] w-full ">
                    {currentComponent}
                </div>
            </div>
        </>
  )
}
