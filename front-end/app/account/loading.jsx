import React from "react";

export default function loading() {
    
    return (
        
        <div className="h-full rounded-md mt-10 flex md:flex-row flex-col w-[80%] mx-auto items-center justify-evenly bg-[#fafafd] py-10 animate-pulse">
            
            <div className="px-5 md:w-1/2 md:h-1/2 flex items-center flex-col">
                <div className="bg-gray-300 w-[25rem] h-[25rem] p-2 rounded-full border-2 border-white"></div>
                <div className="bg-gray-300 w-4/5 h-8 mt-4"></div>
            </div>

            <div className="h-full flex flex-col items-center justify-center flex-wrap gap-y-10 md:mt-0 mt-4">
            
                <div className="w-full text-center">
            
                    <div className="bg-gray-300 w-36 h-8"></div>
                
                    <div className="bg-gray-300 w-40 h-6 mt-2"></div>
            
                </div>

                <div className="flex items-center justify-center gap-x-10">
                    
                    <div className="text-center text-xl text-gray-700">
                        <div className="bg-gray-300 w-24 h-8"></div>
                        <div className="bg-gray-300 w-16 h-6 mt-2"></div>
                    </div>
                    
                    <div className="text-center text-xl text-gray-700">
                        <div className="bg-gray-300 w-24 h-8"></div>
                        <div className="bg-gray-300 w-16 h-6 mt-2"></div>
                    </div>
                    
                    <div className="text-center text-xl text-gray-700">
                        <div className="bg-gray-300 w-24 h-8"></div>
                        <div className="bg-gray-300 w-16 h-6 mt-2"></div>
                    </div>
                </div>

                <div>
                    <button className="bg-gray-300 py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full text-black ml-10">
                        
                    </button>
                </div>
            </div>
        </div>
  );
}
