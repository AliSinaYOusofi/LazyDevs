import React from 'react'

export default function RenderVideos({videoUrl}) {
    return (
        <div className="rounded-md">
            <video 
                src={videoUrl}
                controls
                type="video"
                >
                
            </video>
        </div>
    )
}
