import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function DeleteCommentConfirmation({id: comment_id, func, mod, refechPosts}) {
    
    const [spinner, setSpiner] = useState(false)
    const router = useRouter()
    
    const handleDeletePost = async () => {

        setSpiner(prev => ! prev)

        try {
            const response = await fetch(`http://localhost:3001/blogRoutes/delete_comment?comment_id=${comment_id}`, 
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }
            );
            
            const data = await response.json()
            console.log(data, ' why is it not refreshing')
            if (data.message === "success") {
                location.reload()
            }
            else if (data.message === "failed") toast.error("Failed ! try again later")
        } 
        
        catch (e) {
            console.error("error while deleteing post", e)
            toast.error("server error!")
        }

        finally {
            setSpiner(false)
            func(prev => ! prev)  
        }
    }

    return (
        <div className={`${mod ? "blurry-background pointer-events-auto" : ""}`}>
            <div
                className={`${spinner ? "pointer-events-none" : "pointer-events-auto"} fixed  translate-x-[30%] translate-y-[30%] z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                id="popup-modal"
                tabIndex="-1"
            >
                <div className="relative w-full max-w-md max-h-full">
                    
                    <div className="relative bg-white rounded-lg shadow">
                        
                        <button
                            onClick={() => func( prev => ! prev )}
                            type="button"
                            className="absolute top-3 right-2.5"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                            </svg>
                        
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div className="p-6 text-center">
                            
                            <svg
                                className="mx-auto mb-4  w-12 h-12"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                            
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                            </svg>
                            
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this comment ?
                            </h3>
                            
                            <button
                                onClick={handleDeletePost}
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            >
                                Yes, I'm sure
                                {
                                    spinner ? <div className="border-t-transparent border-solid animate-spin ml-1  rounded-full border-white border-2 h-5 w-5" /> : null
                                }
                            </button>
                            
                            <button
                                onClick={() => func(prev => !prev)}
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}
