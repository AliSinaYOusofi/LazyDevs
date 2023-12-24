import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export const metadata = {
    title: "Analytics"
}
export default function layout({children}) {

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
