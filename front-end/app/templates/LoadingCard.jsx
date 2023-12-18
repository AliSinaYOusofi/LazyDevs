import React from 'react'

export default function LoadingCard() {
    
    return (
        <div className={`px-8 py-4 md:w-1/2 rounded-lg mt-4 animate-pulse`}>
            {/* Loader for number */}
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
            <hr />

            {/* Loader for title and content */}
            <div className="mt-2">
                <div className="w-3/4 h-6 bg-gray-200 mb-2"></div>
                <div className="w-full h-12 bg-gray-200 mb-4"></div>
            </div>

            {/* Loader for link */}
            <div className="w-1/3 h-10 bg-gray-200 rounded-full mt-2"></div>
            <hr className="mt-3" />
        </div>
    )
}
