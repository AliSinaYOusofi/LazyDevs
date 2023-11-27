import React from 'react'

export default function FollowingTags({tag}) {
    return (
        <div className=" px-10 py-5 bg-[#fafafd] rounded-md text-center">
            {tag || "NA"}
        </div>
    )
}
