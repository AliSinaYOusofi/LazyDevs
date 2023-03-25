import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const validateImageBeforeSubmit = (imageDetails) => {
    // check image type and size before submission
    let flag = false;
    let allowedTypes = [ 'jpeg', 'jpg', 'png'];
    
    // cheching image type and size

    // now another check. which should check that at least one of the
    // fields is changed then we show that the must changed something
    // to be able to submit the form
    
    if (imageDetails) {

        let isImage = imageDetails.type.split("/")[0].toLowerCase();
        let imageType = imageDetails.type.split("/")[1].toLowerCase();

        if (isImage !== "image") toast.error("Only images are allowed")

        else if (!allowedTypes.includes(imageType)) toast.error("Allowed image types: png, jepg, jpg.");
        
        else if (imageDetails.size / 1000000 >= 6) toast.error("image size can't more than 6 MBs");
        
        return flag;
    }
}