"use client"
import Spinner from '@/components/Spinner/Spinner';
import ValidatorIcon from '@/components/ValidatorIcons/ValidatorIcon';
import { emailValidator } from '@/functions/emailValidator';
import { otpValidator } from '@/functions/otp_validator';
import { passwordValidator } from '@/functions/passwordValidator';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'

export default function VerifyAccount({}) {

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("")
    const [spinner, setSpinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const router = useRouter()

    const handleResetPassword = async () => {

        if (! emailValidator(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        else if ( ! otpValidator(otp)) {
            return setErrorMessage("Please enter a valid OTP.")
        }

        setErrorMessage(null)
        setSpinner(true)

        try {
            
            const response = await fetch("http://localhost:3001/blogRoutes/verify_signup", 
                {
                
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({ email, otp }),
                }
            );
            
            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);

                setTimeout( () => router.push("/login"), 3000)
            } 
            
            else {
                const errorData = await response.json();
                setErrorMessage(errorData.error);
            }
        } 
        catch (error) {
            console.error("while reseting pass: " , error)
            setErrorMessage("An error occurred while processing your request.");
        }
        
        finally {
            setSpinner(false)
        }
    }

    return (
        <div className="w-[50%] mx-auto mt-[10%] h-screen">
            {errorMessage && 
                <p className="w-full mt-10 p-10 rounded-md border-2 border-red-500 text-center font-bold font-mono uppercase text-3xl">
                    {errorMessage}
                </p>}
            {successMessage && 
                <p className="w-full mt-10 p-10 rounded-md border-2 border-green-500 text-center font-bold font-mono uppercase text-3xl">
                    {successMessage}
                </p>}

            <h1 className="text-3xl mt-4 font-bold tracking-wide"> A confirmation code was sent to your email</h1>
            
            <p className="tracking-wide mt-4"> Please confirm your account to continue</p>
            
            <div className="flex mt-10 relative items-center border-2 py-2 px-3 rounded-md mb-4 group">
                        
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
            
                <input className="pl-2 outline-none border-none w-full" type="text" name="" id="" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                <ValidatorIcon field={email} fieldValidator={emailValidator} />
            </div>
            
            <div className="flex relative mt-4 items-center border-2 py-2 px-3 rounded-md group">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
                </svg>

                
                <input className="pl-2 outline-none border-none w-full" type={"text"} name="" id="" placeholder="Pin code sent your email" onChange={(e) => setOtp(e.target.value)}/>
                <ValidatorIcon field={otp} fieldValidator={otpValidator} />
            </div>

            <button 
                disabled={spinner} 
                type="button" 
                onClick={handleResetPassword} 
                className="relative w-full shadow-md shadow-black/10 transition-all duration-300 hover:bg-black hover:text-white mt-4 py-2 rounded-md  font-semibold mb-2">
                Confirm Account
                { spinner ? <Spinner /> : null}
            </button>
        </div>
    )
}
