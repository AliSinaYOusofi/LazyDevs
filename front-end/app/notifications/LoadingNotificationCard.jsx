import React from 'react'

export default function LoadingNotificationCard() {
    return (
        <div className="max-w-2xl px-8 py-4 mx-auto bg-gray-200 rounded-lg mt-4 animate-pulse flex items-center justify-between">
            
            <div className="flex items-center gap-x-2">
                
                <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                
                <div>
                    <div className="w-48 h-4 bg-gray-300 mb-2 rounded"></div>
                    <div className="w-32 h-3 bg-gray-300 rounded"></div>
                </div>
            </div>
            
            <button
                type="button"
                className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-300 text-gray-400 cursor-not-allowed"
                disabled
            >
                
            </button>
            
            <div>
                <div className="w-24 h-8 bg-gray-100 rounded-full text-black text-center flex justify-center items-center">
                    
                </div>
            </div>
        </div>
    )
}
