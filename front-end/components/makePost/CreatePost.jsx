"use client";
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import EasyMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import OpenRingSpinner from '../Spinner/OpenRingSpinner';
import Link from 'next/link';


export default function CreatePost() { 

    const handleImagePreview = () => {}

    
    const [spinner, setSpinner] = useState(false);

    const [postContent, setPostContent] = useState({content: ""});
 
    const handleImageUpload = async (image, onSuccess, onError) => {
        // validating the image
        if (image.size / 1000000 >= 8) return toast.error(`${image.name} is more than 5 MB`);

        try {
            
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "notipfs");
            
            
            const res = await axios.post('https://api.cloudinary.com/v1_1/dudhf0avt/image/upload', formData);
            const {secure_url} = await res.data;
            
            await onSuccess(secure_url);
        } 
        catch (error) { toast.error("failed to upload image"); console.log(error)}
    }

    const anOptions = useMemo(() => {
        return {
          autosave: {
            enabled: true,
            uniqueId: "demo",
          },
          spellChecker: true,
          autoFocus: true,
          previewImagesInEditor: true,
          imagesPreviewHandler: handleImagePreview,
          lineNumbers: true,
          uploadImage: true,
          imageUploadFunction: handleImageUpload,
          errorCallback: errorMessage => toast.error(errorMessage),
          showIcons: ["strikethrough", "table", "code", "upload-image"],
          hideIcons: ["image"],
          timeFormat: {
            locale: 'en-US',
            format: {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                },
            },
        };
    }, []);


    const handlePost = async () => {

        setSpinner(true);
        // saving post to db.
        
        if (postContent.content.length < 2) return toast.error("post must be at least 2 characters long");
        
        const token = document.cookie.split("=")[1];

        try {
            const res = await axios.post("http://localhost:3001/user/save_post", {
                content: postContent.content,
                token: token
            });  

            console.log(res.data)
            if (res.data.message === "success") toast.success("post created successfully");
            else if (res.data.message === "serverError") toast.success("Server Error");
 
            setPostContent({content: ""})
        } catch(err) {
            toast.error("failed to create post");
            console.log(err);
        }
        setSpinner(false);
    }

    return (
        <>
            <div className="w-[90%] mx-auto mt-[1rem]"> 
                <EasyMDE 
                    options={anOptions}
                    className=""
                    value={postContent.content}
                    onChange={(value) => setPostContent({...postContent, content: value})}
                />
                <button  
                    className="py-2  gap-x-2 px-2 border-2 border-white rounded-md   bg-black/80 text-white"
                    onClick={handlePost}
                    > 
                    
                    post
                    {
                        spinner ?  <OpenRingSpinner /> : null
                    }
                </button>
                <Link href="/templates" className="hover:text-blue-500 ml-10">
                    See templates
                </Link>
            </div>
        </>
    )
}
