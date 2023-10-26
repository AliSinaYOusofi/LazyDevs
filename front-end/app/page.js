"use client"
import Footer from '@/components/Footer/Footer'
import HeroSection from '@/components/heroSection/HeroSection'
import Navbar from '@/components/Navbar/Navbar'
import Statistic from '@/components/Stats/Stats'
import Step from '@/components/Step/Step'
import Teams from '@/components/Teams/OurTeam'
import './globals.css'
import React from 'react'
import MoveToTop from '@/components/moveToTop/MoveToTop';
import { useAppContext } from '@/context/useContextProvider'
import useCurrentUser from '@/hooks/useCurrentUser'


export default function page() {
  
  const currentUser = useCurrentUser()
  const stepsComponentRef = React.useRef(null);

  // window.addEventListener("visibilitychange", (e) => {
  //   if (document.visibilityState === "visible") {
  //     if (localStorage.getItem("currentUser")) {
  //       console.log("setting the user")
  //       setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
  //     }
  //     console.log("is visible")
  //   }
  //   console.log("hidden")
  // }
  // )
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
