import React from 'react'

export default function Loading() {
    return (
        <div className="border-l-2 max-w-xl border-black px-8 py-4 mx-auto bg-gray-200 rounded-lg mt-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

            <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
                <div className="mt-2 h-3 bg-gray-300 rounded"></div>
            </div>

            <div className="w-20 h-8 bg-gray-300 rounded"></div>
        </div>
    )
}
