import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '../emailValidator';
import axios from 'axios';

export const handleLoginSubmit = async (email, password) => {
    
    if (! navigator.onLine) return toast.warning("You are offline");

    else if (!email) toast.error("provide an email address");
    else if (!password) toast.error("provide a password");
    else if (!emailValidator(email)) toast.error("Invalid email provided");
    
    // tha's it for the validation
    else {
        // going backend finally
        try { 
            const response = await axios.post("http://localhost:3001/user/check_user_login", 
            {
                password,
                email,
                
            }, {withCredentials: true}); // allow cookies
            console.log(response);
            console.log(document.cookie);
            response.data === "Invalid" ? toast.error("Invalid email or password") : toast.success("Success")
        } 
        catch(error) {
            if (error.code === "ECONNABORTED") toast.error("Request Timed out. Try again later !");
            else if (error.request) toast.error("Network Error. Try again later.");
            else toast.error("Error. Try again later");
            console.log(error, "error while handling logi submit");
        }
    }
}