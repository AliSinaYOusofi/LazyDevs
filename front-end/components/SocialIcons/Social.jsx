import React from 'react'

export default function Social() {
    return (
        <div>
            <span className="text-base font-bold tracking-wide text-gray-900">
            Social
            </span>
            <div className="flex items-center mt-1 space-x-3">
                <a
                    href="http://www.twitter.com"
                    className="transition-all duration-700 p-1 hover:shadow-md shadow-inner shadow-black/10 rounded-full"
                    target={"_blank"}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4138/4138126.png"
                        alt="twitter"
                        className="w-10"
                    />
                </a>
                <a
                    href="https://www.instagram.com"
                    className="transition-all duration-700 p-1 hover:shadow-md shadow-inner shadow-black/10 rounded-full"
                    target={"_blank"}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4138/4138124.png"
                        alt="insta"
                        className="w-11"
                    />
                </a>
                <a
                    href="https://www.facebook.com"
                    className=" transition-all duration-700 p-2 hover:shadow-md shadow-inner shadow-black/10 rounded-full"
                    target={"_blank"}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                        alt="facebook"
                        className="w-9"
                    />
                </a>
            </div>
        </div>
    )
}
