import axios from "axios";

export const saveImageToCloudinaryAnReturnSecureURL = async (imageToUpload) => {
    try {
        const imageFile = new FormData();
        imageFile.append("file", imageToUpload);
        imageFile.append("upload_preset", "xvmh6gbo");

        const response = await axios.post("https://api.cloudinary.com/v1_1/dudhf0avt/image/upload", imageFile);
        return await response.data.secure_url;
    }
    catch(error) { 
        console.error("Error while saving to cloudinary: %s", error);
        return "https://cdn-icons-png.flaticon.com/512/4202/4202831.png";
    }
}