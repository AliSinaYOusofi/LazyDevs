"use client";
import { emailValidator } from '@/functions/emailValidator';
import { handleLoginSubmit } from '@/functions/login_submit/handleLoginSubmit';
import Link from 'next/link';
import React, {  useState } from 'react'
import HideUnhide from '../HideUnhidePassword/HideUnhide';
import ValidatorIcon from '../ValidatorIcons/ValidatorIcon';
// toast messages
import { ToastContainer, toast } from 'react-toastify';

import Spinner from '../Spinner/Spinner';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/useContextProvider';

 
// 52MA6ZEiRsE9hG8 account@gmail.com

export default function Login() {

    const { setCurrentUser } = useAppContext();

    const [hidePassword, setHidePassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        
        let response = await handleLoginSubmit(email, password);

        console.log(response, 'login')

        if (!response) return toast.error("Network Error")

        if (response.data === "Invalid")  toast.error("Invalid email or password")

        else if (response.data === "Server Error")  toast.error("Server Error");
        
        else if (response.data) {
            localStorage.setItem("currentUser", JSON.stringify(response.data))
            setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
            console.log(JSON.parse(localStorage.getItem("currentUser")))
            console.log(response.data)
            router.push("/feed");
        }
        else if (response === "failed") setSpinner(false)    
        setSpinner(false)
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-x-10 md:px-0">

            <div className="w-full md:max-w-7xl md:px-0 px-2 md:mx-auto md:flex md:flex-col md:items-center md:justify-center md:gap-x-10">
                <p className="text-center mt-2 font-bold">Sign in to access your account</p>

                <div className="mt-5 mx-auto md:w-3/5 w-full max-w-md">
                    <form className="flex md:relative justify-center items-center border-2 py-2 px-3 rounded-2xl mb-4 group">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input required={true}
                                className="pl-2 mx-auto w-full outline-none border-none"
                                type="text"
                                name=""
                                id=""
                                placeholder="Email Address"
                                onChange={(e) => setEmail(e.target.value)}/>
                        <ValidatorIcon field={email} fieldValidator={emailValidator} />
                    </form>

                    <div className="flex md:relative items-center border-2 py-2 px-3 rounded-2xl group">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        <input required={true}
                            className="pl-2 w-full outline-none border-none"
                            type={hidePassword ? "text" : "password"}
                            name=""
                            id=""
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}/>
                        <HideUnhide required={true}
                            field={password}
                            condition={hidePassword}
                            setConditionFunction={setHidePassword} />
                    </div>
                    
                    <button disabled={spinner}
                        type="button"
                        onClick={() => {
                            setSpinner(true);
                            handleSubmit();
                        }}
                        className="block md:relative shadow-md shadow-black/10 outline-none border-none transition-all duration-300 hover:bg-black hover:text-white mt-4 py-2 px-6  w-full rounded-md  font-semibold mb-2">
                    Login
                    { spinner ? <Spinner /> : null}
                    </button>
                    
                    <Link href={"/create_account"}
                        className="text-sm w-full md:ml-2 hover:text-blue-500 cursor-pointer block md:mt-2 md:inline-block">
                    Don't have an account? Signup
                    </Link>
                    
                    <Link href={"/"}
                        className="text-sm block mt-2 md:mt-0 hover:text-blue-500 cursor-pointer md:ml-2 md:inline-block">
                    Home
                    </Link>
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
