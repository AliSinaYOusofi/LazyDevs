import Link from 'next/link'
import React from 'react'

export default function ApplyButton({data}) {

    return (
        <Link href={{ pathname:"/create_post", query: {'content' : data} }}                 className=" relative w-1/3 duration-300 hover:text-white md:mt-4 cursor-pointer  rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900 py-1 h-8 md:h-10 px-4 mt-2 text-lg font-ligh "
        >
            Apply template
        </Link>
    )
}
