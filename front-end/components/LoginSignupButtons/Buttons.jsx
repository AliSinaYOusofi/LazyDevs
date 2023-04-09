import React from 'react'

export default function Buttons() {
    return (
        <div className="hidden md:inline">
            <button className="py-2 px-2 border-2 border-white rounded-md hidden md:inline bg-black/80 text-white"> Create Account</button>
            <button className="ml-2 p-2 border-1 border-2 border-black rounded-md">Login</button>
        </div>
    );
}
