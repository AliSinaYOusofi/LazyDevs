"use client"
import ValidatorIcon from "@/components/ValidatorIcons/ValidatorIcon";
import { emailValidator } from "@/functions/emailValidator";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [spinner, setSpinner] = useState(false);

    const handleResetRequest = async () => {
        
        setSpinner(true)

        if (! emailValidator(email)) {
            setErrorMessage("Please enter a valid email address.");
            setSpinner(false)
            return;
        }

        setErrorMessage(null)
        try {
            const response = await fetch("http://localhost:3001/blogRoutes/reset_password", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);
            } else {
                const errorData = await response.json();
                console.log(errorData)
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
    };

    return (
        <div className="w-[50%] mx-auto  h-screen mt-20">
            
            <h1 className="text-5xl font-bold mb-5"> Find Your account </h1>

            <p className="mb-4"> Please enter your email address to search for your account. </p>
            
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
            
            <Link
                href="/login"
                className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-500  text-white transition-all  hover:bg-gray-900" 
            >
                Cancel
            </Link>

            <button
                onClick={handleResetRequest} 
                type="button" 
                className="py-1 ml-4 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900" 
                disabled={spinner}
            >
                Search
                {
                    spinner && <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-400 border-2 h-7 w-7"></div>
                }
            </button>
            
                {errorMessage && 
                <p className="w-full mt-10 p-10 rounded-md border-2 border-red-500">
                    {errorMessage}
                </p>}

            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default ForgotPassword;
