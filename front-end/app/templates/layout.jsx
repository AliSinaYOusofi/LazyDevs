"use client"
import React from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Templates from '@/components/templates/Templates'
import Footer from '@/components/Footer/Footer'

export default function Layout() {


    return (
        <div>
            <Navbar />
            <Templates />
            <Footer />
        </div>
    )
}
