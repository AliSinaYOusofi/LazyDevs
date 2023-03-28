import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '../emailValidator';
import { fullnameValidator } from '../fullnameValidator';
import { passwordValidator } from '../passwordValidator';
import { usernameValidator } from '../usernameValidator';


export const handleSignupSubmit = async (email, password, username, fullName, confirmPassword, profileUrl) => {
    
    if (! (fullName && username && email && password && confirmPassword)) toast.error("Please provide your details")

    else if (!fullnameValidator(fullName)) toast.error("Fullname must be at least 2 characters");
    
    else if (!usernameValidator(username)) toast.error("Don't use spaces for username");
    
    else if (!emailValidator(email)) toast.error("Invalid email provided");
    
    else if (!passwordValidator(password) || ! passwordValidator(confirmPassword)) toast.error("Password is to short. Include a number an a character.");

    else if (password !== confirmPassword) toast.error("Confirm password don't match");
    
    else {
        
        // default avatar for profile picture
        if (!profileUrl) profileUrl = "https://cdn-icons-png.flaticon.com/512/4202/4202831.png";
        
        try { 
            const response = await axios.post("http://localhost:3001/user/save_user", 
            {
                username,
                fullName,
                password,
                email,
                profileUrl
            });
            
            // we are good from the front-end part.
            // just check the back-end. for unique email and username
            if (response.data === "UserSaved") toast.success("You are now a member.");
            else toast.error("Server error. Try again later!");
        
        } catch(error) {
            console.log(error);
        }
    }
}