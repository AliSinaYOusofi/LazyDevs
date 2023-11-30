import React from "react";

export default function LoadingBlogCard({ width }) {
    
    return (
        <div
            className={`${
                width ? "w-full" : "max-w-2xl"
            } px-8 py-4 mx-auto bg-[#fafafd] mt-10 transition-all duration-100  from-pink-500 via-red-500 to-yellow-500  rounded-lg`}
            >
                
            {/* Skeleton structure */}
            <div className="animate-pulse flex items-center justify-between">
                
                <div className="flex items-center gap-x-4">
                
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                
                <div>
                    <div className="w-32 h-4 bg-gray-300 rounded"></div>
                    <div className="w-20 h-3 bg-gray-300 rounded mt-1"></div>
                </div>
                </div>
                <div className="bg-gray-300 h-8 w-20 rounded-full"></div>
            </div>
            
            <div className="mt-4">
            
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            
                <div className="mt-2 w-full h-3 bg-gray-300 rounded"></div>
            
                <div className="mt-2 w-full h-3 bg-gray-300 rounded"></div>
            
                <div className="mt-2 w-3/4 h-3 bg-gray-300 rounded"></div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
            
                <div className="flex gap-x-4">
            
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
            
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            
                </div>
                <div className="w-1/4 h-3 bg-gray-300 rounded"></div>
            </div>
            
            <div className="mt-2 flex gap-x-2">
            
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
            
                <div className="w-12 h-4 bg-gray-300 rounded"></div>
            
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}
