import React from 'react'

export default function HiddenReplySmallPortion({body}) {


    return (
        <div className="p-4 max-w-xl mt-3 ml-24 rounded-full outline-none border-black border-[1px]  text-black flex items-center justify-between">
            <p className="text-black"> {body} </p>
        </div>
    )
}
