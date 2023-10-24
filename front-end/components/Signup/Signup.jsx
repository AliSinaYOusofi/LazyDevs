"use client";

import { useAppContext } from '@/context/useContextProvider';
import { emailValidator } from '@/functions/emailValidator';
import { fullnameValidator } from '@/functions/fullnameValidator';
import { passwordValidator } from '@/functions/passwordValidator';
import { usernameValidator } from '@/functions/usernameValidator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import HideUnhide from '../HideUnhidePassword/HideUnhide';
import Profile from '../ProfileImage/Profile';
import ValidatorIcon from '../ValidatorIcons/ValidatorIcon';

import { handleSignupSubmit } from '@/functions/signup_submit/handleSignupSubmit';
import Spinner from '../Spinner/Spinner';
import { sleep } from '@/functions/sleep/sleep';
import { toast } from 'react-toastify';


export default function Signup() {
    const router = useRouter();

    const {profileUrl} = useAppContext();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const handleSignup = async () => {

        setSpinner(true);

        try {
            let response = await handleSignupSubmit(email, password, username, fullName, confirmPassword, profileUrl);
            
            console.log(response);
            if (response === "saved") {
                await sleep(1000);
                router.push("/login");
            }
            else if (response === "usernameExists" || response === "emailExists") toast.error("username or email already taken")

            else if (response ==="error") toast.error("Server error try again later !");

            setSpinner(false);
        } catch (error) {
            console.log("Error in signup comp", error);
            toast.error("Server error try again later !");
        }
    }
    return (
        <>  
            <div className="h-screen md:flex items-center justify-center w-full">
                
                <div className="flex-col lg:px-4 w-full lg:w-1/2 md:w-1/2 justify-center items-center bg-white">
                    <div className="">
                        <code className="text-white mx-auto w-fit md:hidden lg:mt-8 flex p-2 rounded-md  items-center bg-black/80">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                            <span className="">LazyDevs</span>
                        </code>
                        <p className="text-center mt-8 md:mt-0">Join our community today and discover a world of possibilities</p>
                    </div>
                    <Profile />
                    <form className="bg-white mt-4 px-4 md:px-0">
                        <div className="flex relative items-center border-2 py-2 px-3 rounded-md mb-4 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="text" name="" id="" placeholder="Full name" onChange={(e) => setFullName(e.target.value)}/>
                            <ValidatorIcon field={fullName} fieldValidator={fullnameValidator} />
                        </div>
                        
                        <div className="flex relative items-center border-2 py-2 px-3 rounded-md mb-4 group">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            
                            <input className="pl-2 outline-none border-none w-full" type="text" name="" id="" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                            <ValidatorIcon field={username} fieldValidator={usernameValidator} />
                        </div>
                        
                        <div className="flex relative items-center border-2 py-2 px-3 rounded-md mb-4 group">
                        
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        
                            <input className="pl-2 outline-none border-none w-full" type="text" name="" id="" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                            <ValidatorIcon field={email} fieldValidator={emailValidator} />
                        </div>
                        
                        <div className="flex relative items-center border-2 py-2 px-3 rounded-md group">
                        
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            
                            <input className="pl-2 outline-none border-none w-full" type={hidePassword ? "text" : "password"} name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            
                            <HideUnhide field={password} condition={hidePassword} setConditionFunction={setHidePassword} />
                            <ValidatorIcon field={password} fieldValidator={passwordValidator} />
                        </div>
                        <div className="flex relative mt-4 items-center border-2 py-2 px-3 rounded-md group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            
                            <input className="pl-2 outline-none border-none w-full" type={hideConfirmPassword ? "text" : "password"} name="" id="" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            
                            <HideUnhide field={confirmPassword} condition={hideConfirmPassword} setConditionFunction={setHideConfirmPassword} />
                            <ValidatorIcon field={confirmPassword} fieldValidator={passwordValidator} />
                        </div>
                        
                        <button 
                            disabled={spinner} 
                            type="button" 
                            onClick={handleSignup} 
                            className="block relative w-full shadow-md shadow-black/10 transition-all duration-300 hover:bg-black hover:text-white mt-4 py-2 rounded-md  font-semibold mb-2">
                            Create Account
                            { spinner ? <Spinner /> : null}
                        </button>
                        
                        <Link href={"/login"} className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Already have an account? login</Link>
                        <Link href={"/"} className="text-sm block ml-2 hover:text-blue-500 cursor-pointer">Back to homepage</Link>
                    
                    </form>
                </div>
            </div>
       </>
    )
}

