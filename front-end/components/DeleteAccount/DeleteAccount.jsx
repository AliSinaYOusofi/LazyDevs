import { useAppContext } from '@/context/useContextProvider';
import delete_cookie from '@/functions/delete_cookie';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import FetchPostError from '../Error/FetchPostError/FetchPostError';

export default function DeleteAccount() {
    
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [spinner, setSpinner] = useState(false);

    const {setCurrentUser} = useAppContext()
    const router = useRouter()

    const handleDelete = async () => {
        
        setSpinner(true);
        
        try {
            let response = await fetch('http://localhost:3001/user/delete_account', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const json = await response.json()

            if (json.status === "success") {
                setCurrentUser(null);
                localStorage.removeItem("currentUser");
                delete_cookie("accessToken")
                delete_cookie("refreshToken")
                router.push("/");
            } else if (json.message === "failed") {
                setErrorMessage("Failed to delete account, Try again!")
            }
        }
        catch(e) {
            console.error(e, 'while deleting user')
            setErrorMessage("Server error, try again later")
        }
        finally {
            setSpinner(false);
        }
    };

    const toggleConfirmDelete = () => {
        setConfirmDelete(!confirmDelete);
    };

    return (
        <div className=" mx-auto p-4 my-auto">
            <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
            <div className="text-gray-700">
                <p className="mb-4">
                    Deleting your account will:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>Delete any and all content you have, such as articles, comments, or your reading list.</li>
                    <li>Can't be recovered</li>
                </ul>
            </div>
            {confirmDelete ? (
                <div className="flex items-center justify-between mb-4 w-fit">
                    <button
                        disabled={spinner}
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 flex items-center text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Confirm Delete
                        {
                            spinner 
                            ? <div className="border-t-transparent border-solid animate-spin  rounded-full border-white border-2 h-6 w-6 ml-2"></div> 
                            : null
                        }
                    </button>
                    <button
                        onClick={toggleConfirmDelete}
                        className="bg-green-300 hover:bg-green-400 text-gray-100 font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button
                    onClick={toggleConfirmDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Delete Account
                </button>
            )}

            <div>
                {
                    errorMessage && showErrorMessage ? <FetchPostError message={errorMessage} setTrigger={setShowErrorMessage} /> : null
                }
            </div>
        </div>
    );
}
