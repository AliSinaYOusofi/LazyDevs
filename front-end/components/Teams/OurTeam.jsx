import React from "react";
export default function Teams () {
    
    // scrolling through our tema members: animation
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
                <p className="inline-block px-3 py-2 mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg bg-teal-400">
                Dream Team
                </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-[3rem] font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                    <defs>
                    <pattern
                        id="247432cb-6e6c-4bec-9766-564ed7c230dc"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                    >
                        <circle cx="1" cy="1" r=".7" />
                    </pattern>
                    </defs>
                    <rect
                    fill="url(#247432cb-6e6c-4bec-9766-564ed7c230dc)"
                    width="52"
                    height="24"
                    />
                </svg>
                <span className="relative">Welcome</span>
                </span>{' '}
                our talented team of professionals
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
            The team of programmers is truly remarkable, their exceptional skills, dedication, and collaborative spirit have resulted in the creation of 
            innovative, high-quality software solutions that have exceeded all expectations.
            </p>
            </div>

            <div className="flex w-full p-10 items-center justify-evenly flex-row flex-wrap shadow-black/10 shadow-md rounded-md i gap-x-24">
                <div className="gap-y-4 flex flex-col md:flex-row gap-x-10">

                    <div className="flex shadow-black/10 shadow-md p-4 rounded-md items-center gap-x-2 jusitfy-center ">
                        <img
                            className="object-cover w-20 h-20 rounded-full"
                            src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                            alt="Person"
                        />
                        <span className="text-sm font-bold">Ali Sina</span>
                        <span className="text-sm text-gray-800"></span>
                    </div>
                    
                    <div className="flex shadow-black/10 shadow-md p-4 rounded-md items-center gap-x-2  jusitfy-center">
                        <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt="Person"
                        />
                    
                        <p className="text-sm font-bold">Ahmad Zaki</p>
                        <p className="text-sm text-gray-800"></p>
                        
                    </div>
                    <div className="flex shadow-black/10 shadow-md p-4 rounded-md items-center gap-x-2  jusitfy-center ">
                        <img
                        className="object-cover w-20 h-20 mr-4 rounded-full shadow "
                        src="https://cdn-icons-png.flaticon.com/512/3006/3006876.png"
                        alt="Person"
                        />
                        
                        <p className="text-sm font-bold">Mohammad Aimal</p>
                        <p className="text-sm text-gray-800"></p>
                        
                    </div> 
                </div>
            </div>
        </div>
    );
  };