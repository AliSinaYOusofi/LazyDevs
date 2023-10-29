import React from 'react'

export default function DisplayComments({author, comment, _id, profileUrl, date}) {

    return (
        <div key={_id} className="max-w-2xl mt-10 border-2 border-gray-50 rounded-md p-4">
            
            <div className="flex flex-row mt-3">
                <img src={profileUrl} alt="" className="w-10 h-10 rounded-full ml-2 object-cover" />
                <p className="ml-2 flex items-center text-xl">{author}</p>
                <p className="ml-4 font-bold flex items-center">{date ? date.split("T")[0] : "NA"}</p>
            </div>
            <p className="ml-4 mt-4">{comment}</p>
        </div>
    )
}
