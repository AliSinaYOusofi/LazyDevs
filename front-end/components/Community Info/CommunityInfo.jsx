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
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            className="w-7 h-7"
                        >
                            <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" />
                        </svg>
                    Code of conduct
                    </Link>
                </li>
                <li className="w-full p-1" id="bu-users-accordion">
                    <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/privacy_and_policy" ? "bg-white" : ""}`}  href="/privacy_and_policy">
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            className="w-7 h-7"
                            >
                            <path d="M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330z" />
                            <path d="M378.4 475.1a35.91 35.91 0 00-50.9 0 35.91 35.91 0 000 50.9l129.4 129.4 2.1 2.1a33.98 33.98 0 0048.1 0L730.6 434a33.98 33.98 0 000-48.1l-2.8-2.8a33.98 33.98 0 00-48.1 0L483 579.7 378.4 475.1z" />
                        </svg>
                    Privacy and policy
                    </Link>
                </li>

                <li className="w-full p-1" id="bu-users-accordion">
                    <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/contact_us" ? "bg-white" : ""}`}  href="/contact_us">
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            className="w-7 h-7"
                            >
                            <path d="M594.3 601.5a111.8 111.8 0 0029.1-75.5c0-61.9-49.9-112-111.4-112s-111.4 50.1-111.4 112c0 29.1 11 55.5 29.1 75.5a158.09 158.09 0 00-74.6 126.1 8 8 0 008 8.4H407c4.2 0 7.6-3.3 7.9-7.5 3.8-50.6 46-90.5 97.2-90.5s93.4 40 97.2 90.5c.3 4.2 3.7 7.5 7.9 7.5H661a8 8 0 008-8.4c-2.8-53.3-32-99.7-74.7-126.1zM512 578c-28.5 0-51.7-23.3-51.7-52s23.2-52 51.7-52 51.7 23.3 51.7 52-23.2 52-51.7 52zm416-354H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zm-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120v496z" />
                        </svg>
                    Contact
                    </Link>
                </li>

                <li className="w-full p-1" id="bu-users-accordion">
                    <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/about" ? "bg-white" : ""}`}  href="/about">
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            className="w-7 h-7"
                            >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={40}
                                d="M196 220h64v172"
                            />
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeMiterlimit={10}
                                strokeWidth={40}
                                d="M187 396h138"
                            />
                            <path d="M256 160a32 32 0 1132-32 32 32 0 01-32 32z" />
                        </svg>
                    About
                    </Link>
                </li>
            </ul>
        </div>
    )
}
