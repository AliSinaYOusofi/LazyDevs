import Link from 'next/link'
import React from 'react'

export default function TemplateCard({image, content, title}) {

    return (
        
        <div className="max-w-sm bg-white  rounded-lg shadow-sm">
            <a href="#">
                <img className="rounded-t-lg" src={image} alt="blog template image" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-90">{title}</h5>
                </a>
                <p class="mb-3 font-normal ">{content}</p>
                <Link scroll={true} href={{pathname: "/temps", query: {title}}}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                    Check template
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}
