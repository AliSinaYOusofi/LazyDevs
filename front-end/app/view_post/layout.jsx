import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer';

export const metadata = {
    title: "Feed"
}
export default function Layout({children}) {
    
    return (
        <div className={`w-full h-screen`}>

            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
