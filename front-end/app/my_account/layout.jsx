import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export const metadata = {
    title: "My Account"
}
export default function Layout({children}) {

    return (
        <>
            <Navbar />
            {children}
            
        </>
    )
}
