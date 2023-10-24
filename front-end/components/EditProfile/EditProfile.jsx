import React, { useState } from 'react';
import Profile from '../ProfileImage/Profile';
import { useAppContext } from '@/context/useContextProvider';
import { fullnameValidator } from '@/functions/fullnameValidator';
import { passwordValidator } from '@/functions/passwordValidator';
import { usernameValidator } from '@/functions/usernameValidator';
import ValidatorIcon from '../ValidatorIcons/ValidatorIcon';
import HideUnhide from '../HideUnhidePassword/HideUnhide';

const UserInfoForm = () => {

    const {profileUrl} = useAppContext();

    const [username, setUsername] = useState('');
    const [workEducation, setWorkEducation] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

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

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
        username,
        workEducation,
        bio,
        password,
        confirmPassword,
        selectedImage,
        profileUrl
        });
    };

  return (
    <div className="shadow-white shadow-lg">

        <form onSubmit={handleSubmit} className="flex flex-col mx-auto w-full justify-center items-center">

            <Profile />

            <div className="flex mt-10 gap-x-4">

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

            <div className="flex gap-x-4">

                <div className="flex relative items-center border-2 py-2 px-3 rounded-md group">
                        
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd" />
                    </svg>
                    
                    <input className="pl-2 outline-none border-none w-full" type={hidePassword ? "text" : "password"} name="" id="" placeholder="Password" onChange={setPassword}/>
                    
                    <HideUnhide field={password} condition={hidePassword} setConditionFunction={setHidePassword} />
                    <ValidatorIcon field={password} fieldValidator={passwordValidator} />
                </div>
                
                <div className="flex relative items-center border-2 py-2 px-3 rounded-md group">
                        
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-all duration-75 group-hover:text-black" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd" />
                    </svg>
                    
                    <input className="pl-2 outline-none border-none w-full" type={hidePassword ? "text" : "password"} name="" id="" placeholder="confirm password" onChange={setConfirmPassword}/>
                    
                    <HideUnhide field={confirmPassword} condition={hideConfirmPassword} setConditionFunction={setHideConfirmPassword} />
                    <ValidatorIcon field={confirmPassword} fieldValidator={passwordValidator} />
                </div>
            </div>

            <div className="flex gap-x-4 mt-4">
                
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
            <button
            type="submit"
            className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            Update
            </button>

        </form>
    </div>
  );
};

export default UserInfoForm;