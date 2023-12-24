import PrivacyAndPolicy from '@/components/Community Info/PrivacyAndPolicy'
import Footer from '@/components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar';
import React from 'react'

export const metadata = {
    title: "Privacy and Policy"
}
export default function Page() {
    return (
        <>
            <Navbar />
            <PrivacyAndPolicy />
            <Footer />
        </>
    )
}
