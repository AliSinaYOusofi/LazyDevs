import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import CreatePost from '@/components/makePost/CreatePost'

export default function layout({children}) {
    return (
        <div className="w-[100%] ">
            <Navbar />
            <CreatePost />
            
            <Footer />
            
        </div>
    )
}
