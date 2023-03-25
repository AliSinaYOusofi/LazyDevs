import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '../emailValidator';


export const handleLoginSubmit = async (email, password) => {
    
    if (!email) return toast.error("provide an email address");
    else if (!password) return toast.error("provide a password");
    else if (!emailValidator(email)) return toast.error("Invalid email provided");
    // tha's it for the validation
    else {
        // going backend finally
    }
}