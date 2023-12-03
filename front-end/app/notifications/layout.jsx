import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'


// to the server component
// display the notifications
// the notifications will be: when someone comments on their post
// when a user who he/she is following posts something
//
export default function layout({children}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>

    )
}
