"use client";
import { emailValidator } from '@/functions/emailValidator';
import { passwordValidator } from '@/functions/passwordValidator';
import Link from 'next/link';
import React, { useRef, useState } from 'react'

export default function Login() {

    const [hidePassword, setHidePassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {

    }

    return (
        <div className="w-full h-screen flex flex-row items-center justify-center gap-x-10">
            
            <div className="md:flex relative hidden  items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" 
                    alt="image"
                    className="rounded-md h-[32rem]"
                />
                <div className="w-full h-full rounded-md bg-gray-900 bg-opacity-40 absolute top-0"></div>

                <div className="max-w-xl absolute top-[50%] translate-y-[50%] mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    
                    <h1 className="text-white md:text-[3rem] text-sm tracking-wide font-extrabold">LazyDevs</h1>
                    <p className="text-base text-white md:text-lg mt-8">
                        Intuitive and user-friendly blogging platform for developers.
                        Made by developers for developers/Programmers.
                    </p>
                </div>
            </div>
            
            <div className="">
                <div className="">
                    <code className="text-indigo-600 w-fit flex mx-auto shadow-black/20 shadow-md p-2 rounded-full hover:animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                        <span className="text-indigo-300">LazyDevs</span>
                    </code>
                    <p className="text-center mt-2 font-bold">Sign in to access your account</p>
                    <p className="text-center mt-4">Join our community today and discover a world of possibilities</p>
                </div>

                <div className="mt-5">
                    <div className="flex relative items-center border-2 py-2 px-3 rounded-2xl mb-4 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 w-full outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                        {
                            email.length
                            ?
                            (
                                emailValidator(email)
                                ?
                                
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 bg-green-500 rounded-full text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 bg-red-500 rounded-full text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )
                            : null
                        }
                    </div>
                        <div className="flex relative items-center border-2 py-2 px-3 rounded-2xl group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 w-full outline-none border-none" type={hidePassword ? "text" : "password"} name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            <div className="absolute right-2 cursor-pointer" onClick={() => setHidePassword(prev => !prev)}>
                                {
                                    password.length
                                    ?
                                    (

                                        hidePassword
                                        ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )
                                    : null
                                }
                            </div>
                            <div className="absolute right-10">
                                {
                                    password.length
                                    ?
                                    (
                                        passwordValidator(password)
                                        ?
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  bg-green-500 rounded-full text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  bg-red-500 rounded-full text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )
                                    : null
                                }
                        </div>
                        </div>
                        <button type="button" onClick={handleSubmit} className="block w-full shadow-md shadow-black/10 outline-none border-none transition-all duration-300 hover:bg-black hover:text-white mt-4 py-2 rounded-md  font-semibold mb-2">Create Account</button>
                        <Link href={"/signup"} className="text-sm w-full ml-2 hover:text-blue-500 cursor-pointer">Don't have an account? Signup</Link>
                        <Link href={"/"} className="text-sm block ml-2 hover:text-blue-500 cursor-pointer">Home</Link>
                </div>
            </div>
        </div>
    )
}
