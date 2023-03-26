"use client";
import { clearInput } from '@/functions/clearInput';
import { validateImageBeforeSubmit } from '@/functions/imageValidator';
import { saveImageToCloudinaryAnReturnSecureURL } from '@/functions/saveImageToCloudinary';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';

export default function Profile() {
    const [secureUrl, setSecureUrl] = useState(false);
    const handleSelectProfile = async (e) => {
        validateImageBeforeSubmit(e.target.files[0]);
        console.log(e.target.files[0]);
        setSecureUrl(await saveImageToCloudinaryAnReturnSecureURL(e.target.files[0]));
        // clean up
        e.target.value = '';
    }

    return (
        <>
            <div className="flex items-center justify-center mt-4">
                
                <label htmlFor="profile_image">
                    <input
                        type="file"
                        placeholder='profile image'
                        className="hidden"
                        id="profile_image"
                        onChange={handleSelectProfile}
                        onClick={clearInput}
                    />
                    <img
                        src={secureUrl||"https://cdn-icons-png.flaticon.com/512/4202/4202831.png"}
                        alt="profile image"
                        className="w-24 h-24 shadow-black/10 cursor-pointer shadow-sm rounded-full  object-cover"
                        
                    />
                    Select Profile
                </label>
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
        </>
    )
}
