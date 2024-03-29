import Footer from '@/components/Footer/Footer'
import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
export default function Layout( {children }) {

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
