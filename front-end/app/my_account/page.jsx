"use client"
import AccountDetails from '@/components/AccountDetails/AccountDetails'
import PostOfUserBasedId from '@/components/SingleUserPosts/PostOfUserBasedId'
import { useAppContext } from '@/context/useContextProvider'
import React, {useState, useEffect} from 'react'

export default function Page() {
    
    const [activeListItem, setActiveListItem] = useState(0)
    const [currentComponent, setCurrentComponent] = useState()

    const {currentUser} = useAppContext();

    let liArray = ["Profile", "Posts", "Analytics", "Followers"]
    let components = [<AccountDetails />, <PostOfUserBasedId author={currentUser ? currentUser._id : null}/>]

    const handleListItemClick = (index) => {
        setActiveListItem(index)
        setCurrentComponent(components[index])
        console.log(index);
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
        <div className="w-screen h-screen gap-x-4 flex flex-row items-center justify-center mx-uto">
            
            <div className="w-[20%] ml-20">
                
                <ul className="">
                    {menuItems}
                </ul>
            </div>
            
            <div className="w-[70%]">
                {currentComponent}
            </div>
        </div>
  )
}
