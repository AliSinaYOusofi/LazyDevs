import { useAppContext } from '@/context/useContextProvider'
import React, { useState, useEffect } from 'react'
import FollowingTags from './FollowingTags'
import FetchPostError from '../Error/FetchPostError/FetchPostError'
import SuccessMessage from '../Error/SuccessMessage'

export default function UserTags() {
    
    const [errorMessages, setErrorMessages] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [tagInputs, setTagInputs] = useState(['', '', '']);
    const [spinner, setSpinner] = useState(false)
    
    const { currentUser} = useAppContext()
    console.log(currentUser)
    const handleTagSubmit = async () => {
        
        try {
            setSpinner(true)
            const response = await fetch("http://localhost:3001/accountRoutes/update_tag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({tagInputs})
            })

            const json = await response.json()

            console.log(json, 'tags')
            if (response.status === 200) {
                if (json.status === "success") {
                    setSuccessMessage(json.message)
                }
                else if (json.status === "failed") {
                    setErrorMessages(json.message)
                }
            }

            else if (response.status === 400) {
                setErrorMessages(json.message)
            }
        }
        catch( e ) {
            console.error(e, 'while uploading tags')
        } finally {
            setSpinner(false)
        }
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...tagInputs];
        newInputs[index] = value;
        setTagInputs(newInputs);
    };

    return (
        <div className='w-full mx-auto bg-cover'>
            <h1 className="md:text-4xl text-xl  font-bold tracking-wide mt-10 md:mt-0">Following Tags</h1>
            <p className="mt-4 text-gray-600"> Followed tags drive the relevance of posts in your newsfeed.</p>

            <h1 className="md:text-2xl text-xl  font-bold tracking-wide  mt-10">Currently following Tags</h1>
            {
                currentUser?.socials?.length !== 0 ? 
                currentUser?.socials?.map((tag, index) => <FollowingTags tag={tag}/>)
                : <div> 
                    <p className="mt-4 text-gray-600">No tags are currently followed.</p>
                    <p className="mt-4 text-gray-600">If no tags are followed random posts will be displayed</p>
                </div>
            }

            <h1 className="md:text-2xl text-xl  font-bold tracking-wide  mt-10"> Create or Update tag(s)</h1>
            
            <div className="flex items-center mt-4">
                {tagInputs.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Tag ${index + 1}`}
                        className="  rounded-md px-4 py-3 mr-2 outline-none border-none bg-[#fafafd]"
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
                <button 
                    type="button"
                    disabled={tagInputs.some((value) => !value) || spinner} 
                    className="py-1 h-8 md:h-10 px-4 mt-2 inline-flex justify-center items-center text-lg font-light gap-2 rounded-md bg-gray-800 text-white transition-all hover:bg-gray-900"
                    onClick={handleTagSubmit}
                >
                    Submit
                    {
                        spinner ? <div className="border-t-transparent border-solid animate-spin ml-1  rounded-full border-gray-400 border-2 h-5 w-5"></div> : null
                    }
                </button>
                {
                    errorMessages ? <FetchPostError error={errorMessages} /> : null
                }
                {
                    successMessage ? <SuccessMessage message={successMessage} /> : null
                }
            </div>
        </div>
    )
}
