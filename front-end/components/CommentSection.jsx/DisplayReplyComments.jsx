import React from 'react'
import CopyToClipBoard from './CopyToClipBoard'

export default function DisplayReplyComments({author, comment, _id, profileUrl, date, distance}, sorted) {

    return (
        <>
        <div id={_id} key={_id} className="max-w-2xl  mt-10 p-4 ml-24 bg-[#fafafd] rounded-xl outline-none">
            
            <div className="flex flex-row mt-3">
                <img src={profileUrl} alt="" className="w-10 h-10 rounded-full ml-2 object-cover" />
                <p className="ml-2 flex font-light items-center text-sm md:text-xl">{author}</p>
                <p className="ml-4 md:text-base text-sm font- font-extralight flex items-center">{date ? date.split("T")[0] : "NA"}<i className="md:text-sm  font-extralight text-xs text-gray-600 ml-1"> ({distance}) </i></p>
            </div>

            <div className="w-full flex items-center justify-between">
                    <p className="ml-4 mt-4">{comment}</p>
                    <CopyToClipBoard content={comment}/>
            </div>
        </div>
        </>
    )
}
