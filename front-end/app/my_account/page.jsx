"use client"
import AccountDetails from '@/components/AccountDetails/AccountDetails'
import EditProfile from '@/components/EditProfile/EditProfile'
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

    let liArray = ["Profile", "Edit Profile", "Posts", "Saved", "Analytics", "Followers"]
    let components = [<AccountDetails />, <EditProfile />, <PostOfUserBasedId author={currentUser ? currentUser._id : null}/>, <SavedPosts />]

    const handleListItemClick = (index) => {
        setActiveListItem(index)
        setCurrentComponent(components[index])
    }

    const menuItems = liArray.map( (li, index) => 
        <li 
            className={`${activeListItem === index  ? "shadow-sm border-l-4 border-l-black shadow-white border-r-black border-b-4 pl-2 rounded-md list-none py-2 mt-2 transition-all duration-200 cursor-pointer hover:translate-x-2": "transition-all duration-200 cursor-pointer hover:translate-x-2 py-2 mt-2  list-none border-b-black border-b-[1px]"}`} 
            
            key={index} 
            
            onClick={() => handleListItemClick(index)}>
            {li}
        </li> 
    );
    
    useEffect( () => {
        if (!currentComponent) setCurrentComponent(components[activeListItem])

        return () => setCurrentComponent(components[0])
    }, [])

    return (
        <>
            <div className="w-full relative h-full gap-x-4 flex flex-col md:flex-row items-start justify-center mx-uto mt-10">
                
                <div className="md:w-[20%] w-full md:ml-20 px-4 md:px-0">
                    
                    <ul className="">
                        {menuItems}
                    </ul>
                </div>
                
                <div className="md:w-[70%] w-full ">
                    {currentComponent}
                </div>
            </div>
            <ToastContainer />  
        </>
  )
}
