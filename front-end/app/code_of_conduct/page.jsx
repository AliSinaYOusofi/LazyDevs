"use client";

import CodeOfConduct from '@/components/Community Info/CodeOfConduct'
import Footer from '@/components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar'
import React from 'react'

export const metadata = {
  title: "Code Of Conduct"
}
export default function Page() {
  return (
    <>
        <Navbar />
        <CodeOfConduct />
        <Footer />
    </>
  )
}
