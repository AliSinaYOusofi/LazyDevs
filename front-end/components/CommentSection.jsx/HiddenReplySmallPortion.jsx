import React from 'react'

export default function HiddenReplySmallPortion({body}) {


    return (
        <div className="p-4 max-w-xl mb-3 ml-24 rounded-xl outline-none border-red-100 border-2 from-black/10 via-white to-gray-50 hover:bg-gradient-to-r  text-black flex items-center justify-between">
            <p className="text-black"> {body} </p>
        </div>
    )
}
