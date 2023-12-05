"use client"
import PostsIcon from '@/components/SVG/PostsIcon'
import ProfileIcon from '@/components/SVG/ProfileIcon'
import TagsIcon from '@/components/SVG/TagsIcon'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect} from 'react'
import PostSearchResult from './PostSearchResult'
import UsersSearchResult from './UsersSearchResult'
import TagSearchResults from './TagSearchResults'

export default function page({searchParams}) {
    
    const [activeListItem, setActiveListItem] = useState(0)
    const [currentComponent, setCurrentComponent] = useState()

    let liArray = ["Posts", "Users", "Tags"]
    let liIconMapping = [<PostsIcon />, <ProfileIcon />, <TagsIcon />]
    let components = [<PostSearchResult query={searchParams.q}/>, <UsersSearchResult query={searchParams.q}/>, <TagSearchResults />]

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
        if (!currentComponent) setCurrentComponent(components[activeListItem])
        return () => setCurrentComponent(components[0])
    }, [])
    return (
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
    )
}
