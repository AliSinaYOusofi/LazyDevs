import React from 'react'

export default function ErrorModal({errorMessage, setCloseFunction}) {

    return (
        <div className="w-full flex  justify-between items-center mt-10 p-10 rounded-md border-2 border-red-500 text-center font-bold font-mono uppercase text-3xl">
            <p>
                {errorMessage}
            </p>
            
            <div>
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </div>
        </div>
    )
}
