import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '../emailValidator';


export const handleLoginSubmit = async (email, password) => {
    
    if (!email) toast.error("provide an email address");
    else if (!password) toast.error("provide a password");
    else if (!emailValidator(email)) toast.error("Invalid email provided");
    // tha's it for the validation
    else {
        // going backend finally
        
    }
}