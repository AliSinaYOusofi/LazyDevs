"use client";
import { emailValidator } from '@/functions/emailValidator';
import { handleLoginSubmit } from '@/functions/login_submit/handleLoginSubmit';
import { passwordValidator } from '@/functions/passwordValidator';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import HideUnhide from '../HideUnhidePassword/HideUnhide';
import ValidatorIcon from '../ValidatorIcons/ValidatorIcon';

// toast messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../Spinner/Spinner';


export default function Login() {

    const [hidePassword, setHidePassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);

    const handleSubmit = async () => {
        setSpinner(true);
        await handleLoginSubmit(email, password);
        setSpinner(false);
    }

    return (
        <div className="w-full h-screen flex flex-row items-center justify-center gap-x-10">
            
            <div className="md:flex relative hidden  items-center justify-center">
                <img 
                    src="https://img.freepik.com/premium-photo/notebook-with-toolls-notes-about-blog_132358-3229.jpg?w=1060" 
                    alt="image"
                    className="rounded-md h-[32rem]"
                />
                <div className="absolute rounded-md top-0 w-full bg-black/20 h-full"></div>                
                <div className="max-w-xl absolute bottom-[4%] translate-y-[50%] mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    
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

                <div className="mt-5 mx-auto ml-10 md:ml-0">
                    <form className="flex relative justify-center items-center border-2 py-2 px-3 rounded-2xl mb-4 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input required={true} className="pl-2 mx-auto w-full outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                        <ValidatorIcon field={email} fieldValidator={emailValidator} />
                    </form>
                        <div className="flex relative items-center border-2 py-2 px-3 rounded-2xl group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            <input required={true} className="pl-2 w-full outline-none border-none" type={hidePassword ? "text" : "password"} name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            <HideUnhide required={true} field={password} condition={hidePassword} setConditionFunction={setHidePassword} />
                        </div>
                        <button 
                            disabled={spinner}
                            type="button" 
                            onClick={handleSubmit} 
                            className="block relative w-full shadow-md shadow-black/10 outline-none border-none transition-all duration-300 hover:bg-black hover:text-white mt-4 py-2 rounded-md  font-semibold mb-2">
                            
                            Create Account
                            { spinner ? <Spinner /> : null}
                        </button>
                        <Link href={"/create_account"} className="text-sm w-full ml-2 hover:text-blue-500 cursor-pointer">Don't have an account? Signup</Link>
                        <Link href={"/"} className="text-sm block ml-2 hover:text-blue-500 cursor-pointer">Home</Link>
                </div>
            </div>
            <ToastContainer 
                position='top-center'
                autoClose={"4000"}
                newestOnTop
                pauseOnHover
                theme="light"
                draggable={false}
                closeOnClick={true}
                containerId={"dismiss"}
            />
        </div>
    )
}
