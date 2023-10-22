"use client"
import AccountDetails from '@/components/AccountDetails/AccountDetails'
import React, {useState, useEffect} from 'react'

export default function Page() {
    
    const [activeListItem, setActiveListItem] = useState()
    const [currentComponent, setCurrentComponent] = useState()

    let liArray = ["Profile", "Posts", "Analytics", "Followers"]

    const menuItems = liArray.map( (li, index) => 
        <li 
            className={`${activeListItem === index  ? "bg-[#161B22] border-l-4 border-black list-none py-2 mt-2 transition-all duration-200 roun rounded-md cursor-pointer hover:bg-white/10": "transition-all duration-200 roun rounded-md cursor-pointer hover:bg-white/10 py-2 mt-2  list-none bg-gray-100 border-l-4"}`} 
            
            key={index} 
            
            onClick={() => {
               
                }
            }>
            {li}
        </li> 
    );
    
    useEffect( () => {
        if (!currentComponent) setCurrentComponent(<AccountDetails />)
    }, [])

    return (
        <div className="w-full flex flex-row items-center justify-center mx-uto">
            
            <div className="w-[20%] ">
                
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
