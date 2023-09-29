"use client";

import Footer from '@/components/Footer/Footer'
import HeroSection from '@/components/heroSection/HeroSection'
import Navbar from '@/components/Navbar/Navbar'
import Statistic from '@/components/Stats/Stats'
import Step from '@/components/Step/Step'
import Teams from '@/components/Teams/OurTeam'
import './globals.css'
import React from 'react'
import MoveToTop from '@/components/moveToTop/MoveToTop';

export const metadata = {
  title: 'LazyDevs',
  description: 'Blogging website',
}

export default function page() {
  const stepsComponentRef = React.useRef(null);

  return (
    <main>
      <Navbar />
      <HeroSection stepsComponentRef={stepsComponentRef}/>
      <div ref={stepsComponentRef}>
        <Step /> 
      </div>
      <Statistic />
      <Teams />
      <Footer />
      <MoveToTop /> 
    </main>
  )
}
