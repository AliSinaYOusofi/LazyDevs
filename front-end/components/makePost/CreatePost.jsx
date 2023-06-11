"use client";

import 'react-toastify/dist/ReactToastify.css';
import EasyMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useMemo } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../../components/Navbar/Navbar'

export default function CreatePost() { 

    const handleImagePreview = () => {}
 
    const handleImageUpload = async (image, onSuccess, onError) => {
        // validating the image
        if (image.size / 1000000 >= 8) return toast.error(`${image.name} is more than 5 MB`);
        
        else if (count > 1) return toast.error("you can't upload more than 2 images");

        try {
            
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "notipfs");
            
            count++; // set count was not working so used local var
            
            const res = await axios.post('https://api.cloudinary.com/v1_1/dudhf0avt/image/upload', formData);
            const {secure_url} = await res.data;
            
            imageUrls.push(secure_url);
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

    return (
        <>
            <div className="mt-10"></div>
           
            <EasyMDE 
                options={anOptions}
            />
            <Footer />
        </>
    )
}
