// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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

        if (isImage !== "image") return false

        else if (!allowedTypes.includes(imageType)) return false
        
        else if (imageDetails.size / 1000000 >= 6) return false
        
        flag = true
    }

    return flag
}