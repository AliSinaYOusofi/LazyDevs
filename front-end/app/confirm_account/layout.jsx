import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export const metadata = {
    title: "Confirm Account"
}
export default function layout({children}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
