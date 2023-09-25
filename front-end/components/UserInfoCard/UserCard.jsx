import Link from 'next/link'
import React from 'react'

export default function UserCard({profile, email, username, date}) {
    return (
        <address className="flex items-center mb-6 not-italic rounded-full">
            <div className="inline-flex justify-center mt-4  p-4 items-center mr-3 text-sm text-gray-900">
                <img className="mr-4 w-16 h-16 rounded-full object-cover shadow-white shadow-lg" src={profile ? profile : "https://stackdiary.com/140x100.png"} alt="" />
                <div>
                    <p className="text-xl font-bold text-gray-900 flex flex-row items-center justify-start">{username ? username : "username"}
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-4 h-4 mt-2 text-blue-500">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </p>
                    <Link href={{ pathname:"/view_user", query: {email: profile ? profile[0]?.email : ""} }} className="text-base font-light text-blue-900 hover:underline">{email ? email : "NA"}</Link>
                    <p className="text-base font-light text-gray-900"><time pubdate="true" dateTime="2022-02-08" title="February 8th, 2022"> posted on {date ? date.split("T")[0] : "NA"}</time></p>
                </div>
            </div>
        </address>
    )
}
