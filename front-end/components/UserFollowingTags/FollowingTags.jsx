import React from 'react'

export default function FollowingTags({tag}) {
    return (
        <div className="py-8 px-6 bg-[#fafafd] rounded-md text-center">
            {tag || "NA"}
        </div>
    )
}
