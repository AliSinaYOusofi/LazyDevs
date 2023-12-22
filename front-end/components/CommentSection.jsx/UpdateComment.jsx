import { useAppContext } from '@/context/useContextProvider';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdateComment({ id: comment_id, func, mod }) {
    
    const [spinner, setSpinner] = useState(false);
    const [updatedComment, setUpdatedComment] = useState('');
    const { setRefetchCommentsAfterCrud } = useAppContext();

    const handleUpdatePost = async () => {
        setSpinner(true);

        try {
            const response = await fetch(`http://localhost:3001/blogRoutes/update_comment?comment_id=${comment_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updatedComment }),
                credentials: 'include',
            });

            const data = await response.json();
            
            if (response.ok) {

                if (data.message === 'success') {
                    setRefetchCommentsAfterCrud(prev => !prev);
                    console.log("updating")
                } 
                else if (data.message === 'failed') toast.error('Failed! Try again later');
            }

            else {
                toast.error("failed to update comment")
            }


        } catch (e) {
            console.error('error while updating post', e);
            toast.error('Server error!');
        } finally {
            setSpinner(false);
            func(prev => !prev);
        }
    };

    return (
        <div className={`${mod ? 'blurry-background pointer-events-auto' : ''}`}>
            <div
                className={`${spinner ? "pointer-events-none" : "pointer-events-auto"} fixed  z-50 p-4 overflow-x-hidden overflow-y-auto  max-h-full bg-white rounded-md top-[40%] md:right-[30%]`}
                id="popup-modal"
                tabIndex="-1"
            >

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
                    {/* Other elements */}
                    <textarea
                        value={updatedComment}
                        onChange={e => setUpdatedComment(e.target.value)}
                        placeholder="Enter updated comment..."
                        className={` bg-white border-black/40 border-[1px] outline-none p-2.5 w-full text-lg text-gray-900 rounded-md`}
                    ></textarea>

                    
                    <button
                        onClick={handleUpdatePost}
                        type="button"
                        className="text-white mt-5 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                        Update Comment
                        {spinner ? (
                            <div className="border-t-transparent border-solid animate-spin ml-1 rounded-full border-white border-2 h-5 w-5"></div>
                        ) : null}
                    </button>

                    <button
                        onClick={() => func(prev => !prev)}
                        type="button"
                        className="text-gray-500 mt-5 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                    >
                        No, cancel
                    </button>

                    {/* Other elements */}
                </div>
            </div>
        </div>
    );
}
