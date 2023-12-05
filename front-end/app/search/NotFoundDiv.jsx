import React from 'react'

export default function NotFoundDiv() {

    return (
        <div className="w-full h-1/2 rounded-md border-2 border-green-700 text-center p-10">
            <h1 className="text-4xl"> The search term did not return any results. </h1>
            <p className="mt-10"> Try a different search term. </p>
        </div>
    )
}
