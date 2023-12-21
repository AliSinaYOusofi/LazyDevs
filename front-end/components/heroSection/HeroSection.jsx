"use client";
import { emailValidator } from '@/functions/emailValidator';
import React, { useState, useEffect } from 'react'
import ValidatorIcon from '../ValidatorIcons/ValidatorIcon'; 
import Typewriter from "typewriter-effect";

 
export default function HeroSection({stepsComponentRef}) {

    const [email, setEmail] = useState("");
    const [subscribe, setSubscribe] = useState("Subscribe");

    const scrollDown = () => {
        if (stepsComponentRef.current)
            stepsComponentRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "start"});
    }

    const handleSubscribe = async () => {
        if (emailValidator(email)) setSubscribe("Subscribed");
    }

    return (
            <div className="px-4 py-16 mx-auto   md:px-24 lg:px-8 lg:py-20">
                <div className="w-full sm:mx-auto ">
                    <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
                    {/* <a href="/" className="mb-6 sm:mx-auto">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                        </div>
                    </a> */}
                    <div className="w-full rounded-md  transition-all duration-300 mb-10 md:mx-auto sm:text-center bg-[#F3F8FF] md:mb-12">
                        <h2 className="full mt-20 h-[20rem] mb-6 head text-9xl font-bold leading-none tracking-tight text-gray-900 md:mx-auto">
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString("Explore ✈️ Ideas, Share 👉 Stories, Inspire ✅ Change")
                                        .pauseFor(1000)
                                        .deleteAll()
                                        .typeString("Your 👨🏻‍💻Blogging 🚀Journey Starts Here.")
                                        .start()
                                        .pauseFor(1000)
                                        
                                }}
                                options={{
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h2>
                        
                    </div>
                        
                    
                    </div>
                    
                    {/* <div className="max-w-2xl mx-auto mt-[">

                        <p className="text-base text-gray-700 md:text-lg">
                            Intuitive and user-friendly blogging platform for developers.
                            Made by developers for developers/Programmers.
                        </p>
                        <form className="flex relative  flex-col items-center w-full mb-4 md:flex-row">
                            
                            <input
                                placeholder="Email"
                                required=""
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={handleSubscribe}
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-black hover:bg-black/90 hover:text-white transition duration-500 rounded shadow-md md:w-auto "
                            >
                                {subscribe}
                            </button>
                            <div className="absolute md:right-[23%] lg:right-[20%] right-0 md top-3">
                                <ValidatorIcon field={email} fieldValidator={emailValidator}/>
                            </div>
                        </form>
                        <p className="mb-10 text-xs text-gray-600 sm:text-sm">
                            Subscribe to our newsletter today and never miss out on the latest blogs.
                        </p>
                    </div> */}
                    <span onClick={scrollDown} className="flex items-center justify-center w-10 h-10 mx-auto text-gray-600 duration-300 transform border border-gray-400 rounded-full hover:text-deep-purple-accent-400 hover:border-deep-purple-accent-400 hover:shadow hover:scale-110 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                        >
                        <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
                        </svg>
                    </span>
                </div>
            </div>
    )
}
