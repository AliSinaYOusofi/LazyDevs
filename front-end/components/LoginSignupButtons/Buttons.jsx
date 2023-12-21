import Link from 'next/link';
import React from 'react'

export default function Buttons() {
    return (
        <div className="hidden md:inline">
            <Link href="/create_account" className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-black hover:bg-black/90 hover:text-white transition duration-500 rounded shadow-md md:w-auto "> Create Account</Link>
            <Link href="/login" className="inline-flex ml-4 items-center justify-center w-full h-12 px-6 font-medium tracking-wide bg-black/90 text-white hover:bg-white/90 hover:text-black transition duration-500 rounded shadow-md md:w-auto ">Login</Link>
        </div>
    );
}
