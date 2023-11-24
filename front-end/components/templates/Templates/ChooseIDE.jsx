import React, { useRef } from 'react'
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation'

export default function ChooseIDE() {

    const htmlRef = useRef()
    const {setTemplateContent} = useAppContext()
    const router = useRouter()

    const handleClick = () => {
        const markDownContent = (html2md(htmlRef.current.innerHTML))
        setTemplateContent(markDownContent)
        router.push("/create_post")
    }

    return (
        <>
            <div ref={htmlRef} className="max-w-2xl mx-auto px-4 py-8 blog">
                <h1> The Top 3 IDEs for Programmers </h1>
                
                <img src={"https://miro.medium.com/v2/resize:fit:1100/format:webp/1*noFh-0tLOeYxml2eUASySg.png"} alt="ide image" />
                
                <h1> What is an IDE? </h1>
                
                <p>
                If you're looking to build a Jakarta EE (formerly Java EE) Application, you're going to need a few things to get started. Whether you're building a web application with Java Server Faces (JSF), a web service using REST, an Enterprise Java Beans (EJB) application, or interacting with a database using Java Persistence API (JPA) - you first need Payara Server® or Payara Micro® and an IDE (Integrated Development Environment).
                </p>

                <p>
                    An IDE is where you'll write your code, debug and even deploy or run your application. An IDE typically has a code editor with syntax highlighting. They also usually have tips and autocomplete. A great feature is that it can highlight errors in real time, so you don't have to compile before finding out you left off a semicolon (nor spend ages searching for it)! Most can compile your code for you without having to use javac or mvn from the command line. It also handily comes with a debugger too.
                </p>

                <h1> What to Look for in an IDE? </h1>
                <p>
                    As Payara Server & Payara Micro are designed to run EE (Enterprise Edition) applications, you're probably interested in IDEs which work well with Java EE, or Jakarta EE, as it's now known.
                </p>
                
                <p>
                    I recommend looking for an IDE with the following:
                </p>

                <ul>
                    <li> Syntax highlighting </li>
                    <li> Debugger</li>
                    <li> Error Highlighting </li>
                    <li> Content assist, also known as autocomplete </li>
                    <li> Ability to see Javadoc when hovering over a method or class </li>
                    <li> EE support (so the above still work when your working with a Servlet, JSP or Facelet)</li>
                    <li> </li>
                </ul>

                <h1> Which EE IDEs are Available? </h1>
                
                <p>
                    The list below is by no means a comprehensive list, just some of the more popular ones in my opinion:
                </p>

                <ul>
                    <li> NetBeans </li>
                    <li> Eclipse Note: Pick the EE specific distribution! </li>
                    <li> IntelliJ IDEA (this requires the 'Ultimate' paid for edition to work with EE projects) </li>
                    <li> Visual Studio Code (VS Code)</li>
                </ul>

                <h1> 1) Eclipse </h1>

                <img src={"https://miro.medium.com/v2/resize:fit:336/format:webp/1*gy0-sMEN5jeY9IV8kYff9A.png"} alt="image of eclipes" />
                <p>
                    Eclipse is an integrated development environment used in computer programming. It contains a base workspace and an extensible plug-in system for customizing the environment.
                </p>

                <h1> 2) IntelliJ IDEA</h1>

                <img src={'https://miro.medium.com/v2/resize:fit:332/format:webp/1*q1yhk92_qqFyCzlBeLuYYQ.png'} alt="intellij" />
                <p>
                    IntelliJ IDEA is an integrated development environment written in Java for developing computer software written in Java, Kotlin, Groovy, and other JVM-based languages.
                </p>

                <p>
                It is developed by JetBrains and is available as an Apache 2 Licensed community edition, and in a proprietary commercial edition.
                </p>

                <h1> 3) Visual Studio </h1>
                <img src="https://miro.medium.com/v2/resize:fit:336/format:webp/1*5oamzNK1fAV9J6_jQunSiw.png" alt="image" />
                <p>
                    Visual Studio is an integrated development environment from Microsoft. It is used to develop computer programs including websites, web apps, web services, and mobile apps.
                </p>
            </div>
            <button 
                type="button" 
                onClick={handleClick} 
                className=" duration-300 hover:text-white cursor-pointer mx-auto rounded-sm bg-gray-800 text-white transition-all hover:bg-gray-900 py-1 h-8 md:h-10  px-4 mt-[10px] text-lg font-ligh ">
                Apply template
            </button>
        </>
        
    )
}
