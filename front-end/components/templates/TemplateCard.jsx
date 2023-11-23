import Link from 'next/link'
import React from 'react'

export default function TemplateCard({image, content, longTitle, title, number}) {

    return (
        <div className={` px-8 py-4 md:w-1/2  rounded-lg mt-4`}>
            <h1 className="text-2xl font-bold px-3 mb-2 rounded-full bg-gray-50 w-fit">{number}</h1>
            <hr />   


            <div className="mt-2">
                
                <Link href={{pathname: "/temps", query: {title}}} className="overflow-ellipsis line-clamp-1 text-2xl font-bold hover:underline">{longTitle}</Link> 
            
                <p className={`  overflow-ellipsis mt-2 mb-4 text-black/90`}>{content}</p>
            </div> 
            
            <Link 
                href={{pathname: "/temps", query: {title}}}
                className=" relative w-1/3 duration-300 hover:text-white md:mt-4 cursor-pointer  rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900 py-1 h-8 md:h-10 px-4 mt-2 text-lg font-ligh "
            >
                Check
            </Link>
            <hr className="mt-3"/>
        </div>
    )
}
