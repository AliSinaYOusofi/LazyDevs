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


export default function Layout() {

    const search = useSearchParams().get("title")
    
    const templatesNames = ["Strawberry", "Burgers", "Protein", "Programming", "IDE", "VS", "Computers", "Google", "Books"]
    const templateComponents = [<Strawberry />, <Burger />, <Protein />, <GetGoodAtProgramming />, <ChooseIDE />, <VSShortcuts />, <Computers />, <GoogleTips />, <ProgrammingBooks />]

    const selectedComponent = templateComponents[templatesNames.indexOf(search)]

    return (
        <div className="w-[90%] mx-auto bg-gray-100 rounded-md mt-3 flex flex-col items-start">
            {selectedComponent}
            <Link href={"/templates"} scroll={false} className="inline-flex mb-3 mx-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                All templates
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
    )
}
