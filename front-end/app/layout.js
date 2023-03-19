"use client"
import Footer from '@/components/Footer/Footer'
import HeroSection from '@/components/heroSection/HeroSection'
import Navbar from '@/components/Navbar/Navbar'
import Statistic from '@/components/Stats/Stats'
import Step from '@/components/Step/Step'
import Teams from '@/components/Teams/OurTeam'
import './globals.css'
import React from 'react'
import MoveToTop from '@/components/moveToTop/MoveToTop'

export const metadata = {
  title: 'LazyDevs',
  description: 'Blogging website',
}

// some articles must be shown on the homepage
// before a user logs
// so users see what they can do on a website
export default function RootLayout({ children }) {

  const stepsComponentRef = React.useRef(null);

  // this fucking error is gonnna take a livetime
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        <HeroSection stepsComponentRef={stepsComponentRef}/>
        <div ref={stepsComponentRef}>
          <Step /> 
        </div>
        <Statistic />
        <Teams />
        <Footer />
        <MoveToTop /> 
      </body>
    </html>
  )
}
