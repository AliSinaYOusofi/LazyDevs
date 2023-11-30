"use client"

import React, {useState, useEffect} from 'react'
import RelevantFeeds from './RelevantFeeds';
import TopFeed from './TopFeed';
import LatestFeed from './LatestFeed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import FollowingFeed from './FollowingFeed';

export default function Page() {
  
  const [blogType, setBlogType] = useState("Relevant")
  
  const menutItems = ["Relevant", "Most Viewed", "Latest", "Following"]
  const components = [<RelevantFeeds />, <TopFeed />, <LatestFeed />, <FollowingFeed />]
  const [currentComponent, setCurrentComponent] = useState(<RelevantFeeds />)

  /* 
    adding the top, latest and relevant options
    when clicked on when one of them then the blogs should also.
  */

  const liItemStyle = 'bg-[#f5f6fb] px-4 py-1 rounded-sm   transition-all duration-300'
  
  const handleLiItemsClick = (e) => {
    setBlogType(e.target.textContent.trim())
    setCurrentComponent(components[menutItems.indexOf(e.target.textContent.trim())])
  }

  const menutItemsHTML = menutItems.map( li => {
    return (
      
      <li onClick={handleLiItemsClick} key={li} className={`${blogType === li ? liItemStyle : "cursor-pointer w-fit px-4 py-1 rounded-sm"}`}> {li} </li>
      
    )
  })

  return (
    <>
      <div className="w-full bg-white/30 mx-auto z-[999]">
        
        <div className="w-[60%] mx-auto flex flex-col items-center justify-evenly">
          <div className=" w-full mt-10">
          <ul className="flex flex-row md:gap-x-10 justify-center items-center">
            {menutItemsHTML}
          </ul>
          </div>
          
          <div className="md:max-w-2xl max-w-[50rem]">  
            {currentComponent}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
