import Link from 'next/link'
import React from 'react'

export default function PostNotFoundDiv() {

    return (
        <div className="w-1/2 mx-auto mt-20 h-1/2 rounded-md border-2 border-green-700 text-center p-10">
            <h1 className="text-4xl mb-10 mt-10"> Could not find post. The post might have been deleted</h1>
            <Link href={"/feed"} className="mt-10"> See other posts</Link>
        </div>
    )
}
