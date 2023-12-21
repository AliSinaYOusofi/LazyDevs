"use client"

import React, {useState, useEffect} from 'react'
import RelevantFeeds from './RelevantFeeds';
import TopFeed from './TopFeed';
import LatestFeed from './LatestFeed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import FollowingFeed from './FollowingFeed';

export default function HandleFeed() {
  
  const [activeListItem, setActiveListItem] = useState(0)
  const [currentComponent, setCurrentComponent] = useState(<RelevantFeeds />)
  
  const menutItems = ["Relevant", "Most Viewed", "Latest", "Following"]
  const components = [<RelevantFeeds />, <TopFeed />, <LatestFeed />, <FollowingFeed />]

  const liItemStyle = 'bg-white md:px-10 md:py-2 px-4 py-1 rounded-sm   transition-all duration-300'
  
  const handleLiItemsClick = (index) => {
    
    setActiveListItem(parseInt(index))
    setCurrentComponent(components[parseInt(index)])
    localStorage.setItem("lastFeedAccessed", index)
  
  }

  const menutItemsHTML = menutItems.map( (li, index) => {
    return (
      
      <li onClick={() => handleLiItemsClick(index)} key={li} className={`${menutItems[activeListItem] === li ? liItemStyle : "cursor-pointer w-fit px-4 py-1 rounded-sm"}`}> {li} </li>
      
    )
  })


  useEffect( () => {
        
    const setLastVisitedComponent = () => {
      
      const lastVisitedComponent = localStorage.getItem("lastFeedAccessed")

      if (lastVisitedComponent !== null) {
        setActiveListItem(parseInt(lastVisitedComponent))
        setCurrentComponent(components[parseInt(lastVisitedComponent)])
      }
    }
    setLastVisitedComponent()
  }, [])


  return (
    <>
      <div className="w-full mx-auto z-[999]">
        
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
