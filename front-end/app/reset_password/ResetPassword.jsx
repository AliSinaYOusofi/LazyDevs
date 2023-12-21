import HideUnhide from '@/components/HideUnhidePassword/HideUnhide';
import Spinner from '@/components/Spinner/Spinner';
import ValidatorIcon from '@/components/ValidatorIcons/ValidatorIcon';
import { emailValidator } from '@/functions/emailValidator';
import { otpValidator } from '@/functions/otp_validator';
import { passwordValidator } from '@/functions/passwordValidator';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'

export default function ResetPassword({email}) {
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const router = useRouter()

    const handleResetPassword = async () => {

        if (! emailValidator(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        else if (! passwordValidator(password)) {
            setErrorMessage("Please enter a valid password.");
            return;
        }

        else if (! passwordValidator(confirmPassword)) {
            setErrorMessage("Please enter a valid confirm password.");
            return;
        }
        
        else if (password !== confirmPassword) {
            setErrorMessage("Passowrds don't match.");
            return;
        }

        else if ( ! otpValidator(otp)) {
            return setErrorMessage("Please enter a valid OTP.")
        }

        setErrorMessage(null)
        setSpinner(true)

        try {
            
            const response = await fetch("http://localhost:3001/blogRoutes/verify_otp", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);

                setTimeout( () => router.push("/login"), 2000)
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
        <div>
            {errorMessage && 
                <p className="w-full mt-10 p-10 rounded-md border-2 border-red-500 text-center font-bold font-mono uppercase text-3xl">
                    {errorMessage}
                </p>}
            {successMessage && 
                <p className="w-full mt-10 p-10 rounded-md border-2 border-green-500 text-center font-bold font-mono uppercase text-3xl">
                    {successMessage}
                </p>}
            <div className="flex relative items-center border-2 py-2 px-3 rounded-md group mt-10">
                        
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
                Reset Password
                { spinner ? <Spinner /> : null}
            </button>
        </div>
    )
}
