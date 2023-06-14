import React from 'react'

export default function Spinner() {
    return (
        <div className="absolute right-10 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-400 border-2 h-7 w-7"></div>
        </div>
    )
}
