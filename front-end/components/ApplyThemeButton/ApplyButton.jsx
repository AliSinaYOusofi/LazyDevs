import Link from 'next/link'
import React from 'react'

export default function ApplyButton({data}) {

    console.log(data);
    return (
        <Link href={{ pathname:"/create_post", query: {'content' : data} }} className="hover:bg-blue-600 hover:text-white mt-10  flex bg-white/50 p-2 rounded-sm w-fit">
            Apply template
        </Link>
    )
}
