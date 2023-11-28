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
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Following from '@/components/Followers/Following'
import TagsIcon from '@/components/SVG/TagsIcon'
import UserTags from '@/components/UserFollowingTags/UserTags'
import DeleteAccount from '@/components/DeleteAccount/DeleteAccount'
import DangerZone from '@/components/SVG/DangerZone'

export default function Page() {
    
    const [activeListItem, setActiveListItem] = useState(0)
    const [currentComponent, setCurrentComponent] = useState()
    const router = useRouter()

    const {currentUser} = useAppContext();

    let liArray = ["Profile", "Edit Profile", "Posts", "Saved", "Followers", "Tags", "Following", "Danger Zone"]
    let liIconMapping = [<ProfileIcon />, <EditProfileIcon />, <PostsIcon />, <SavedPostIcon />, <FollowersIcon />, <TagsIcon />, <FollowersIcon />, <DangerZone />]
    let components = [<AccountDetails />, <EditProfile />, <PostOfUserBasedId author={currentUser ? currentUser._id : null}/>, <SavedPosts />, <Followers />, <UserTags />, <Following />, <DeleteAccount />]

    const handleListItemClick = (index) => {
        setActiveListItem(index)
        setCurrentComponent(components[index])
    }

    const similarClass = "flex items-center justify-start transition-all duration-200 cursor-pointer hover:translate-x-2 py-2 px-2 rounded-r-md mt-2 gap-x-2"
    const menuItems = liArray.map( (li, index) => 
        <li 
            className={`${activeListItem === index  ? `${similarClass} bg-[#fbfbfd] border-l-2 border-black`: `${similarClass}`}`} 
            
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
            <div className="w-full relative md:h-screen gap-x-4 flex flex-col md:flex-row items-start justify-center mx-uto mt-10">
                
                <div className="md:w-[20%] w-full md:ml-20 px-4 md:px-0 ">
                    
                    <ul className="">
                        {menuItems}
                    </ul>
                </div>
                
                <div className="md:w-[70%] w-full h-screen">
                    {currentComponent}
                </div>
            </div>
        </>
  )
}
