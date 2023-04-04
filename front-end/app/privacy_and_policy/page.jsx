import PrivacyAndPolicy from '@/components/Community Info/PrivacyAndPolicy'
import Footer from '@/components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar';
import React from 'react'

export default function page() {
    return (
        <>
            <Navbar />
            <PrivacyAndPolicy />
            <Footer />
        </>
    )
}
