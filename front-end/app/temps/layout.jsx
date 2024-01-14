"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Strawberry from '@/components/templates/Templates/Strawberry'
import Link from 'next/link'
import Burger from '@/components/templates/Templates/BurgerTemplate'
import Protein from '@/components/templates/Templates/Fruits'
import GetGoodAtProgramming from '@/components/templates/Templates/GetGoodAtProgramming'
import ChooseIDE from '@/components/templates/Templates/ChooseIDE'
import VSShortcuts from '@/components/templates/Templates/VSShortcuts'
import Computers from '@/components/templates/Templates/Computers'
import GoogleTips from '@/components/templates/Templates/GoogleTips'
import ProgrammingBooks from '@/components/templates/Templates/ProgrammingBooks'
import Footer from '@/components/Footer/Footer'
import Navbar from "@/components/Navbar/Navbar"


export default function Layout({children}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
