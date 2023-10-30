"use client"

import BlogCard from '@/components/BlogCard/BlogCard';
import FetchPostError from '@/components/Error/FetchPostError/FetchPostError';
import React, {useState, useEffect} from 'react'
import RelevantFeeds from './RelevantFeeds';
import TopFeed from './TopFeed';
import LatestFeed from './LatestFeed';

export default function Page() {
  
  const [blogType, setBlogType] = useState("Relevant")
  
  const menutItems = ["Relevant", "Top", "Latest"]
  const components = [<RelevantFeeds />, <TopFeed />, <LatestFeed />]
  const [currentComponent, setCurrentComponent] = useState(<RelevantFeeds />)
  /* 
    adding the top, latest and relevant options
    when clicked on when one of them then the blogs should also.
  */

  const liItemStyle = 'bg-gray-100 px-4 py-1 rounded-sm   transition-all duration-300'
  
  const handleLiItemsClick = (e) => {
    setBlogType(e.target.textContent.trim())
    setCurrentComponent(components[menutItems.indexOf(e.target.textContent.trim())])
  }

  const menutItemsHTML = menutItems.map( li => {
    return (
      <ul >
        <li onClick={handleLiItemsClick} key={li} className={`${blogType === li ? liItemStyle : "cursor-pointer px-4 py-1 rounded-sm"}`}> {li} </li>
      </ul>
    )
  })

  return (
    <div className="w-full bg-white/30 mx-auto z-[999]">
      
      <div className="w-[60%] mx-auto flex flex-col items-center justify-start">
        <div className="flex flex-row gap-x-10 justify-start items-start w-full mt-10">
          {menutItemsHTML}
        </div>
        
        <div className="md:max-w-2xl max-w-[28rem]">  
          {currentComponent}
        </div>
      </div>
    </div>
  )
}
