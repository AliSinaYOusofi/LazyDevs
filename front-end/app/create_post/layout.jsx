"use client"
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import CreatePost from '@/components/makePost/CreatePost'
import { useSearchParams } from 'next/navigation'

export default function Layout({children}) {

    const content = useSearchParams().get('content');
    return (
        <div className="w-[100%] ">
            <Navbar />
            <CreatePost content={content}/>
            {children}
            <Footer />
            
        </div>
    )
}
