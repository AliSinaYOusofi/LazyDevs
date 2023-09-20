import Link from 'next/link'
import React from 'react'

export default function TemplateCard({image, content, title}) {

    return (
        
        <div class="max-w-sm bg-white  rounded-lg shadow-sm">
            <a href="#">
                <img class="rounded-t-lg" src={image} alt="blog template image" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-90">{title}</h5>
                </a>
                <p class="mb-3 font-normal ">{content}</p>
                <Link scroll={true} href={{pathname: "/temps", query: {title}}}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                    Check template
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}
