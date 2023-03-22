"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Signup() {
    const router = useRouter();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        
        if (fullName.length <= 0) return toast.error("Please provide your full-name");
        
        else if (!usernameValidator(username)) return toast.error("Please provide a username with no spaces");
        
        else if (password && confirmPassword) {
            if(password !== confirmPassword) return toast.error("passwords don't match", { duration: 2000});
            else if (! passwordValidator(password) || ! passwordValidator(confirmPassword)) toast.error("invalid password, 1 uppercase, one number and length >= 8");
        }

        else if (! emailValidator(email)) return toast.error("invalid email provided")

        else if(password && ! confirmPassword)  return toast.error("please provide a confirm password.");
        
        else if(!password && confirmPassword) return toast.error("please provide a password.");
        
        else if(! confirmPassword && ! password && !username) return toast.error("firt make some changes then click");
                
        const newUserRegData = {
            username,
            password,
            confirmPassword,
            fullName,
            email
        }
        
        try {
            const response = await axios.post("/api/update_profile", {
                newUserRegData
            });

            const {message} = await response.data
            if (message === "updated") {
                toast.success("you profile has been updated");
                router.refresh();
            }
            else if(message === "queryError") toast.error("503 internal server error.");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>  
            <div className="h-screen md:flex items-center justify-center w-full gap-x-8">
                <div className="relative overflow-hidden md:flex w-[50%] hidden">
                    <img
                        src="https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="blog image"
                        className="rounded-md"
                    />
                    <div className="w-full h-full rounded-md bg-gray-900 bg-opacity-40 absolute top-0"></div>

                    <div className="w-full absolute top-[50%] translate-y-[50%] text-center ">
                        
                        <h1 className="text-white md:text-[3rem] text-sm tracking-wide font-extrabold">LazyDevs</h1>
                        <p className="text-base text-white md:text-lg mt-8">
                            Intuitive and user-friendly blogging platform for developers.
                            Made by developers for developers/Programmers.
                        </p>
                    </div>
                </div>
                <div className="flex-col justify-center py-10 items-center bg-white">
                    <div className="">
                        <code className="text-indigo-600 w-fit flex mx-auto shadow-black/20 shadow-md p-2 rounded-full hover:animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                            <span className="text-indigo-300">LazyDevs</span>
                        </code>
                        <p className="text-center mt-4">Join our community today and discover a world of possibilities</p>
                    </div>
                    <form className="bg-white mt-4 px-4 md:px-0">
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" onChange={(e) => setFullName(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex mt-4 items-center border-2 py-2 px-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                        <button type="button" onClick={handleSubmit} className="block w-full shadow-md shadow-black/10 transition-all duration-300 hover:bg-black hover:text-white mt-4 py-2 rounded-md  font-semibold mb-2">Create Account</button>
                        <Link href={"/"} className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Already have an account? login</Link>
                    </form>
                </div>
            </div>
       </>
    )
}

