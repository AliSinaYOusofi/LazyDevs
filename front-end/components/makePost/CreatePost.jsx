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
import customMarkdownParser from '@/functions/previewRender';


export default function CreatePost({content}) { 

    
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
            else toast.error("Failed to post !")
 
            setPostContent({content: ""})
        } catch(err) {
            toast.error("failed to create post");
            console.log(err);
        }
        setSpinner(false);
    }

    useEffect(() => {
        if (content) {
          let decodedContent = decodeURIComponent(content)
            .replace(/\[(.*?)\]/g, '$1') // Remove square brackets []
            .replace(/"/g, '') // Remove quotation marks ""
            .replace(/,(?=\S)/g, '')
            .split('10') // Split at the delimiter
            .map((item) => item.trim()) // Trim leading/trailing whitespace
            .filter((item) => item !== '') // Remove empty entries
            .join('\n'); // Join the array elements with line breaks
      
          setPostContent({
            content: decodedContent,
          });
        }
      }, []);

    const renderPreview = (plainText) => {
        const html = plainText.replace(/\n/g, '<br />');
        return html;
    };

    return (
        <>
            <div className="w-[90%] mx-auto mt-[1rem]"> 
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
