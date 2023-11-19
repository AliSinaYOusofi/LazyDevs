import React, { useState } from 'react';
import Profile from '../ProfileImage/Profile';
import { useAppContext } from '@/context/useContextProvider';
import { fullnameValidator } from '@/functions/fullnameValidator';
import { passwordValidator } from '@/functions/passwordValidator';
import { usernameValidator } from '@/functions/usernameValidator';
import ValidatorIcon from '../ValidatorIcons/ValidatorIcon';
import HideUnhide from '../HideUnhidePassword/HideUnhide';
import Spinner from '../Spinner/Spinner';
import { sleep } from '@/functions/sleep/sleep';
import { toast } from 'react-toastify';
import PreviousDetailsOfUser from '../PreviousUserDetails/PreviousDetailsOfUser';

const UserInfoForm = () => {

    const {profileUrl, currentUser, setCurrentUser} = useAppContext();

    const [username, setUsername] = useState('');
    const [workEducation, setWorkEducation] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [work, setWork] = useState('')
    const [spinner, setSpinner] = useState(false);
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [previousDetails, setPreviousDetails] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleWorkEducationChange = (e) => {
        setWorkEducation(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        
        // validating for the new data

        if (! navigator.onLine) return toast.warning("You are offline");
        else if (username.length && ! fullnameValidator(username)) return toast.error("username must be at least 3 chars")
        else if (workEducation.length && ! usernameValidator(workEducation)) return toast.error("education must be at least 2 chars")
        else if (password.length && ! passwordValidator(password)) return toast.error("Password is too short. Include a number and a character.");
        else if (confirmPassword.length && ! passwordValidator(confirmPassword))return  toast.error("confirm pass is too short. Include a number and a character.");
        else if ((password !== confirmPassword)) return toast.error("passwords don't match")
        else if (bio.length && !bio.length >= 5) return toast.error("bio must be at least five chars")
        else if (work.length && ! work.length > 2) return toast.error("work must at least 2 chars")
        
        // checking if the new data is same as the old data

        if (
            username.trim() === '' &&
            workEducation.trim() === '' &&
            password.trim() === '' &&
            confirmPassword.trim() === '' &&
            bio.trim() === '' &&
            work.trim() === ''
        ) return toast.info("there is nothing to update.")
        
        const data = {
            username: username.trim() !== '' ? username : undefined,
            workEducation: workEducation.trim() !== '' ? workEducation : undefined,
            password: password.trim() !== '' ? password : undefined,
            confirmPassword: confirmPassword.trim() !== '' ? confirmPassword : undefined,
            bio: bio.trim() !== '' ? bio : undefined,
            work: work.trim() !== '' ? work : undefined,
            profileUrl: profileUrl === "https://cdn-icons-png.flaticon.com/512/4202/4202831.png" ? undefined : profileUrl,
            id: currentUser._id
        };
        
        const requestToUpdateData = JSON.stringify(
            Object.fromEntries(
                Object.entries(data).filter( ([_, v]) => v !== undefined)
            )
        )
        
        setSpinner(true)
        
        try { 
            const response = await fetch("http://localhost:3001/accountRoutes/update_account", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: requestToUpdateData,
                credentials: "include"
            })

            if (response.ok) {
                
                let json = await response.json()
                setCurrentUser(json.updatedData)

                if (json?.updatedData) toast.success("account info updated")
                else if (json.stauts === "failed") toast.error("failed to update account info")
                else if (json.status === "offline") toast.warning("you are offline")
                else toast.error("unknown error!!!")
            }
        } 
        catch(error) {
            if (error.code === "ECONNABORTED") toast.error("Request Timed out. Try again later !");
            else toast.error("Server error Try again later");
            console.error(error, "error while updating user info");
        }
        
        finally{
            setSpinner(false)
        }
    };

    
    return (
        <div className="shadow-white shadow-lg">
            
            {/* <div className="">

                <button 
                    type="button"
                    onClick={() => setPreviousDetails( prev => !prev )} 
                    className=" px-2 ml-4 shadow-md shadow-black/10 transition-all duration-300 hover:bg-black hover:text-white  py-2 rounded-md  font-semibold mb-2">
                    My Previous data
                </button>

                {
                    previousDetails ? <PreviousDetailsOfUser username={currentUser.username} fullName={currentUser.fullName} education={currentUser.education} bio={currentUser.bio} work={currentUser.work} profileUrl={currentUser.profileUrl}/> : null
                }
            </div> */}
            
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto justify-center items-center w-full md:px-2 px-2">

                <Profile />

                <div className="flex flex-col md:w-1/2 w-full  gap-x-4 mt-4">

                    <div className="flex relative items-center border-2 py-2 px-3 rounded-md mb-4 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none w-full" type="text" name="" id="" placeholder="Full name" onChange={handleUsernameChange}/>
                        <ValidatorIcon field={username} fieldValidator={fullnameValidator} />
                    </div>

                    <div className="flex relative items-center border-2 py-2 px-3 rounded-md mb-4 group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 transition-all duration-75 group-hover:text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>

                        <input className="pl-2 outline-none border-none w-full" type="text" name="" id="" placeholder="education" onChange={handleWorkEducationChange}/>
                        <ValidatorIcon field={workEducation} fieldValidator={fullnameValidator} />
                    </div>
                </div>

                <div className="flex flex-col md:w-1/2 w-full gap-x-4">

                    <div className="flex relative items-center border-2 py-2 px-3 rounded-md group">
                            
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        
                        <input className="pl-2 outline-none border-none w-full" type={hidePassword ? "text" : "password"} name="" id="" placeholder="Password" onChange={handlePasswordChange}/>
                        
                        <HideUnhide field={password} condition={hidePassword} setConditionFunction={setHidePassword} />
                        <ValidatorIcon field={password} fieldValidator={passwordValidator} />
                    </div>
                    
                    <div className="flex mt-4 relative items-center border-2 py-2 px-3 rounded-md group">
                            
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        
                        <input className="pl-2 outline-none border-none w-full" type={hideConfirmPassword ? "text" : "password"} name="" id="" placeholder="confirm password" onChange={handleConfirmPasswordChange}/>
                        
                        <HideUnhide field={confirmPassword} condition={hideConfirmPassword} setConditionFunction={setHideConfirmPassword} />
                        <ValidatorIcon field={confirmPassword} fieldValidator={passwordValidator} />
                    </div>
                </div>

                <div className="flex flex-col md:w-1/2 w-full gap-x-4 mt-4">
                    
                    <div className="mb-4">
                        <textarea
                            cols="50"
                            rows="3"
                            id="bio"
                            value={bio}
                            onChange={handleBioChange}
                            placeholder='bio'
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        ></textarea>
                    </div>
                    
                </div>

                <div className="flex w-full md:w-1/2 relative items-center border-2 py-2 px-3 rounded-md group">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                    
                    <input className="pl-2  outline-none border-none" type="text" name="" id="" placeholder="work" onChange={(e) => setWork(e.target.value)}/>
                                        
                    <ValidatorIcon field={work} fieldValidator={fullnameValidator} />
                </div>

                <button 
                    disabled={spinner} 
                    type="submit" 
                    className=" relative w-1/3 duration-300 hover:text-white md:mt-4 cursor-pointer  rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900 py-1 h-8 md:h-10 px-4 mt-2 text-lg font-ligh mb-2">
                    update
                    { spinner ? <Spinner /> : null}
                </button>

            </form>
        </div>
    );
};

export default UserInfoForm;