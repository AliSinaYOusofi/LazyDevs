"use client"
import React from 'react'

class Contact extends React.Component  {
    render() {
        return (
            <div>
                <div className="w-full p-6 md:w-[50%] mx-auto shadow-black/20 shadow-sm">
                    <div className="mt-12">

                    </div>
                    <h1 className="font-extrabold md:text-[3rem] text-3xl">Contacts</h1>

                    <p className="md:text-3xl text-2xl mt-5"> We would love to hear from you</p>

                    <ul>
                        <li className="mt-4 md:text-2xl text-xl flex items-center">
                            Email: &nbsp;
                            <a
                                href="mailto:info@lorem.mail"
                                aria-label="Our email"
                                title="Our email"
                                className=" underline text-blue-500"
                            >
                                tinayousofiali@gmail.com
                            </a>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1014/1014679.png"
                                alt=""
                                className="w-6 h-6 ml-3"
                            />
                        </li>

                        <li className="mt-4 md:text-2xl text-xl flex items-center">
                            Twitter: &nbsp;
                            <a 
                                href='https://twitter.com/RippedDeveloper'
                                className=" underline text-blue-500"
                            >
                                @RippedDeveloper
                            </a>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3578/3578922.png"
                                alt=""
                                className="w-6 h-6 ml-3"
                            />
                        </li>

                        <li className="flex-col md:flex-row md:flex items-center mt-4 md:text-xl">
                            To report a bug, please create a&nbsp;

                            <a 
                                href="https://github.com/AliSinaYOusofi/LazyDevs"
                                className="underline text-blue-500"
                            >
                                bug report

                            </a>

                            &nbsp;in our open source repository.

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1304/1304061.png"
                                alt=""
                                className="w-6 h-6 ml-3 hidden md:flex"
                            />
                        </li>

                        <li className="flex-col md:flex-row md:flex items-center mt-4 md:text-xl">
                            To request a feature, please&nbsp;
                            <a
                                className="underline text-blue-500"
                                href="https://github.com/AliSinaYOusofi/LazyDevs/Discussions"
                            >
                                start a new GitHub Discussion
                            </a>
                            &nbsp;in our repo.
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3295/3295442.png"
                                alt=""
                                className="w-8 h-8 ml-3 hidden md:flex"
                            />
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default Contact