"use client";
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import EasyMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import axios from 'axios';
import OpenRingSpinner from '../Spinner/OpenRingSpinner';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppContext } from '@/context/useContextProvider';




export default function CreatePost({content}) { 

    const [spinner, setSpinner] = useState(false);
    
    const [postContent, setPostContent] = useState({content: ""});
    const {currentUser, templateContent} = useAppContext()
    
    const handleImagePreview = () => {}
    
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
        catch (error) { toast.error("failed to upload image"); console.error(error)}
    }

    const anOptions = useMemo(() => {
        return {
            autosave: {
                enabled: true,
                uniqueId: "demo",
            },
            spellChecker: true,
            autoFocus: true,
            renderPreview: true,
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

        try {

            const requestData = {
                content: postContent.content,
                user_id: currentUser ? currentUser._id : null
            }
            
            const res = await fetch("http://localhost:3001/user/save_post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData),
                credentials: "include"
            });  

            const json = await res.json();
            console.log(json)
            if (json.message === "success") toast.success("post created successfully");
            else if (json.message === "serverError") toast.success("Server Error");
            else toast.error("Failed to post !")
 
            setPostContent({content: ""})
        } catch(err) {
            toast.error("failed to create post");
            console.error(err);
        }
        setSpinner(false);
    }

    useEffect(() => {
        
        if (templateContent) {
            
            setPostContent({
                content: templateContent,
            });
        }
      }, [content]);

    const renderPreview = (plainText) => {
        const html = plainText.replace(/\n/g, '<br />');
        return html;
    };

    return (
        <>
            <div className="w-[90%] mx-auto mt-[1rem] editor"> 
                <EasyMDE 
                    options={anOptions}
                    className=""
                    value={postContent.content}
                    onChange={(value) => setPostContent({...postContent, content: value})}
                />

                <div className="w-fit flex flex-row">
                    <button  
                        className="py-2 px-4  gap-x-2  border-2 border-white rounded-md flex flex-row items-center justify-between   bg-black/80 text-white"
                        onClick={handlePost}
                        > 
                        
                        post
                        {
                            spinner ?  <OpenRingSpinner /> : null
                        }
                    </button>

                    <Link href="/templates" className="hover:text-blue-500 ml-10 flex bg-white/50 p-2 rounded-sm w-fit">
                        See templates
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
