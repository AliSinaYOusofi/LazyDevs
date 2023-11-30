"use client"
import Link from 'next/link'
import React from 'react'

export default function ErrorPage({reload}) {
    
    return (
        
        <div class="grid h-screen px-4 bg-white place-content-center">
        
            <div class="text-center">
        
                <h1 class="font-black text-gray-200 text-9xl">Unknown Error Occurred</h1>

                <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Uh-oh!
                </p>

                <p class="mt-4 text-gray-500">Sorry an unknown error occured.</p>
                <button 
                        type="button" 
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                        onClick={() => window.location.reload()}   
                    >
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            className='w-7 h-7'
                            >
                            <path d="M256 48C141.31 48 48 141.32 48 256c0 114.86 93.14 208 208 208 114.69 0 208-93.31 208-208 0-114.87-93.13-208-208-208zm94 219a94 94 0 11-94-94h4.21l-24-24L256 129.2l59.8 59.8-59.8 59.8-19.8-19.8 27.92-27.92c-2.4-.08-5.12-.08-8.12-.08a66 66 0 1066 66v-14h28z" />
                        </svg>
                        Retry
                    </button>
                <Link
                    href="/"
                    className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                >
                Go Back Home
                </Link>
            </div>
        </div>
    )
}
