import Footer from '@/components/Footer/Footer'
import Navbar from "@/components/Navbar/Navbar"
import React from 'react'
export const metadata = {
    title: "Reset Password"
}
export default function layout({children}) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
