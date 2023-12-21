import Link from 'next/link'
import React from 'react'

export default function LikerCard({profileUrl, username, author_id, number, date, distance}) {
    
    return (
        <div className="flex flex-row mt-3 items-center">
            <p className="px-2 rounded-full bg-gray-100">{number}</p>

            <div className="flex items-center">
                <img src={profileUrl} alt="" className="w-10 h-10 rounded-full ml-2 object-cover" />
                <Link href={{pathname: `/account/${author_id}`}} className="ml-2 flex font-light items-center text-sm md:text-xl">{username}</Link>
            </div>

            <p className="ml-4 md:text-base text-sm font- font-extralight flex items-center">{date ? date.split("T")[0] : "NA"}<i className="md:text-sm  font-extralight text-xs text-gray-600 ml-1"> ({distance}) </i></p>
        </div>
    )
}
