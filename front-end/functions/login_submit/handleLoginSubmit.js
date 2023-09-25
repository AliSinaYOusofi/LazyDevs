import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '../emailValidator';
import axios from 'axios';

export const handleLoginSubmit = async (email, password) => {
    
    if (! navigator.onLine) return toast.warning("You are offline");

    else if (!email) return toast.error("provide an email address");
    else if (!password) return toast.error("provide a password");
    else if (!emailValidator(email))return  toast.error("Invalid email provided");
    
    try { 
        const response = await axios.post("http://localhost:3001/user/check_user_login", 
            {
                password,
                email,
            }, 
        {withCredentials: true}); // allow cookies
        return response;
    } 
    catch(error) {
        if (error.code === "ECONNABORTED") toast.error("Request Timed out. Try again later !");
        else toast.error("Server error Try again later");
        console.log(error, "error while handling login submit");
        return "failed"
    }
    
}