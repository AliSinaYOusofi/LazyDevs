import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
        <section class="overflow-hidden">
            <div class="flex items-center justify-between px-7 xl:px-40 py-5 bg-white">
                <div class="w-auto">
                    <div class="flex flex-wrap items-center">
                        
                        <Link className="flex items-center" href="#">
                            <span className="text-indigo-500 text-[2rem] font-extrabold"> ForwardDEVS </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>

                        </Link>
                        
                    </div>
                </div>
                <div class="w-auto">
                <div class="flex flex-wrap items-center">
                    <div class="w-auto hidden lg:block">
                    <ul class="flex items-center mr-16">
                        <li class="mr-9 font-medium hover:text-gray-700"><a href="#">Features</a></li>
                        <li class="mr-9 font-medium hover:text-gray-700"><a href="#">Solutions</a></li>
                        <li class="mr-9 font-medium hover:text-gray-700"><a href="#">Resources</a></li>
                        <li class="font-medium hover:text-gray-700"><a href="#">Pricing</a></li>
                    </ul>
                    </div>
                    <div class="w-auto hidden lg:block">
                    <div class="inline-block">
                        <button class="py-3 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Try 14 Days Free Trial</button>
                    </div>
                    </div>
                    <div class="w-auto lg:hidden">
                    <a href="#">
                        <svg class="navbar-burger text-indigo-600" width="51" height="51" viewbox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="56" height="56" rx="28" fill="currentColor"></rect>
                        <path d="M37 32H19M37 24H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </a>
                    </div>
                </div>
                </div>
            </div>
            <div class="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
                <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"></div>
                <nav class="relative z-10 px-9 pt-8 bg-white h-full overflow-y-auto">
                    <div class="flex flex-wrap justify-between h-full">
                        <div class="w-full">
                            <div class="flex items-center justify-between -m-2">
                                <div class="w-auto p-2">
                                <a class="inline-block" href="#">
                                    <img src="flaro-assets/logos/flaro-logo-black.svg" alt="" />
                                </a>
                                </div>
                                <div class="w-auto p-2">
                                <a class="navbar-burger" href="#">
                                    <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 18L18 6M6 6L18 18" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </a>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center py-16 w-full">
                        <ul>
                            <li class="mb-12"><a class="font-medium hover:text-gray-700" href="#">Features</a></li>
                            <li class="mb-12"><a class="font-medium hover:text-gray-700" href="#">Solutions</a></li>
                            <li class="mb-12"><a class="font-medium hover:text-gray-700" href="#">Resources</a></li>
                            <li><a class="font-medium hover:text-gray-700" href="#">Pricing</a></li>
                        </ul>
                        </div>
                        <div class="flex flex-col justify-end w-full pb-8">
                        <div class="flex flex-wrap">
                            <div class="w-full">
                            <div class="block">
                                <button class="py-3 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Try 14 Days Free Trial</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
  )
}
