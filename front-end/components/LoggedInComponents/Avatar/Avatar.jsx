import React from 'react'

export default function Avatar({profileUrl}) {

    // TODO getting the notifications from the server and changing the image
    return (
        <div className="flex items-center justify-center gap-x-2 ml-2">

            <div>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1827/1827370.png"
                    alt="notfications"
                    className="object-contain w-8 h-8"
                />
            </div>
            <div className="cursor-pointer">
                <img
                    src={profileUrl}
                    alt="user profile image"
                    className="object-contain  w-10 h-10 md:shadow-sm lg:shadow-md shadow-black/20 md:p-1 rounded-full "
                />
            </div>
        </div>
    )
}
