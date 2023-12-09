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
    const [tagInputs, setTagInputs] = useState(['', '', '']);
    const [postContent, setPostContent] = useState({content: ""});
    const {currentUser, templateContent, editTags, postid, setPostid, setEditTags} = useAppContext()
    
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
        
        if (postContent.content.length < 10) {
            setSpinner(false);
            return toast.error("post must be at least 10 characters long");
        }   

        try {

            // now there should be two endpoints for this
            
            
            // saving post to db.
            
            if (editTags && postid) { // if this is the case then it's an update mode
                
                const requestData = {
                    content: encodeURIComponent(JSON.stringify(postContent.content)),
                    user_id: currentUser ? currentUser._id : null,
                    tagInputs: tagInputs,
                    post_id: postid
                }

                const res = await fetch("http://localhost:3001/blogRoutes/update_post", 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(requestData),
                        credentials: "include"
                    }
                );  

                const json = await res.json();

                if (json.message === "success") toast.success("post updated successfully");
                else if (json.message === "serverError") toast.success("Server Error");
                else toast.error("Failed to update post !")
                setEditTags(null)
                setPostid(null)
                setPostContent({content: ""})
            }

            // else this is a create mode

            else {
                
                const requestData = {
                    content: encodeURIComponent(JSON.stringify(postContent.content)),
                    user_id: currentUser ? currentUser._id : null,
                    tagInputs: tagInputs,
                }

                const res = await fetch("http://localhost:3001/user/save_post", 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(requestData),
                        credentials: "include"
                    }
                );  
    
                const json = await res.json();
    
                if (json.message === "success") toast.success("post created successfully");
                else if (json.message === "serverError") toast.success("Server Error");
                else toast.error("Failed to post !")
     
                setPostContent({content: ""})
            }
        } catch(err) {
            toast.error("failed to process");
            console.error(err);
        }

        finally {
            setSpinner(false)
        }
    }

    useEffect(() => {
        
        if (templateContent) {
            
            setPostContent({
                content: templateContent,
            });
        }

        if (editTags) {
            setTagInputs(editTags);
        }

        return () => {
            setEditTags(null)
            setPostid(null)
        }
      }, [content]);
    
    const handleInputChange = (index, value) => {
        const newInputs = [...tagInputs];
        newInputs[index] = value;
        setTagInputs(newInputs);
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
                
                <div>
                    <p className="mt-4 text-gray-600">* At least one tag is required</p>
                    {
                        tagInputs.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Tag ${index + 1}`}
                                className="  rounded-md px-4 py-3 mr-2 outline-none border-none bg-[#fafafd]"
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        ))
                    }
                    
                </div>
                
                <div className="w-fit flex flex-row mt-4">
                    <button
                        disabled={tagInputs.every(value => value === '') || spinner }  
                        className="px-5 py-3  gap-x-2 h-8 md:h-10  rounded-md flex flex-row items-center justify-between   bg-gray-800 text-white hover:bg-gray-900"
                        onClick={handlePost}
                        > 
                        
                        post
                        {
                            spinner ?  <OpenRingSpinner /> : null
                        }
                    </button>

                    <button
                        type="button"
                        disabled={postContent?.content ? postContent.content.length === 0 : false }
                        title="clear"
                        onClick={() => setPostContent({})} 
                        className="bg-white ml-4 px-5 py-3  border-2 border-gray-900 text-black rounded-lg h-8 md:h-10 
                        flex items-center justify-center relative">
                        Clear
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
