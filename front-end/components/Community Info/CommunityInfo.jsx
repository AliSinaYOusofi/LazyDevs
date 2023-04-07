import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function CommunityInfo() {

    const pathname = usePathname();
    return (
        <div className="mt-10">
            <p className="font-bold ml-2">Other</p>
            <ul>
                <li className="w-full p-1" id="bu-users-accordion">
                    <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/code_of_conduct" ? "bg-white" : ""}`}  href="/code_of_conduct">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/456/456115.png"
                            alt="home"
                            className="w-6 h-6"
                        />
                    Code of conduct
                    </Link>
                </li>
                <li className="w-full p-1" id="bu-users-accordion">
                    <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/privacy_and_policy" ? "bg-white" : ""}`}  href="/privacy_and_policy">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2512/2512664.png"
                            alt="home"
                            className="w-6 h-6"
                        />
                    Privacy and policy
                    </Link>
                </li>

                <li className="w-full p-1" id="bu-users-accordion">
                    <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/contact_us" ? "bg-white" : ""}`}  href="/contact_us">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9722/9722917.png"
                            alt="home"
                            className="w-6 h-6"
                        />
                    Contact
                    </Link>
                </li>

                <li className="w-full p-1" id="bu-users-accordion">
                    <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/about" ? "bg-white" : ""}`}  href="/about">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9220/9220622.png"
                            alt="home"
                            className="w-6 h-6"
                        />
                    About
                    </Link>
                </li>
            </ul>

        </div>
    )
}
