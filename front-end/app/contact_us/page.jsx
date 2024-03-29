import Contact from '@/components/Community Info/Contact'
import Footer from '@/components/Footer/Footer'
import React from 'react'
import Navbar from '../../components/Navbar/Navbar';

export const metadata = {
    title: "Contact Us"
}
export default function Page() {
    return (
        <>
            <Navbar />
            <Contact />
            <Footer />
        </>
    )
}
