import Link from 'next/link'
import React from 'react'

export default function ChooseIDE() {

    let content = [
        '# The Top 8 IDEs for Programmers $',
        '![book image !]](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*noFh-0tLOeYxml2eUASySg.png) $',
        
        '## What is an IDE? $',
        ' If you\'re looking to build a Jakarta EE (formerly Java EE) Application, you\'re going to need a few things to get started. Whether you\'re building a web application with Java Server Faces (JSF), a web service using REST, an Enterprise Java Beans (EJB) application, or interacting with a database using Java Persistence API (JPA) - you first need Payara Server® or Payara Micro® and an IDE (Integrated Development Environment). $',
        'An IDE is where you\'ll write your code, debug and even deploy or run your application. An IDE typically has a code editor with syntax highlighting. They also usually have tips and autocomplete. A great feature is that it can highlight errors in real time, so you don\'t have to compile before finding out you left off a semicolon (nor spend ages searching for it)! Most can compile your code for you without having to use javac or mvn from the command line. It also handily comes with a debugger too. $',
        'I recommend looking for an IDE with the following:',
        '- 1 Syntax highlighting  $',
        '- 2 Debugger $',
        '- 3 Error Highlighting  $',
        '- 4 Content assist, also known as autocomplete  $',
        '- 5 Ability to see Javadoc when hovering over a method or class  $',
        '- 6 EE support (so the above still work when your working with a Servlet, JSP or Facelet) $',
        
        '## Which EE IDEs are Available? $',
        'The list below is by no means a comprehensive list, just some of the more popular ones in my opinion:',
        '- 1 Eclipse Note: Pick the EE specific distribution! $',
        '- 2 IntelliJ IDEA (this requires the paid for edition to work with EE projects) $',
        '- 3 Visual Studio Code (VS Code) $',
        
        '## 1) Eclipse $',
        'Eclipse is an integrated development environment used in computer programming. It contains a base workspace and an extensible plug-in system for customizing the environment.',
        '!][book image !]]](https://miro.medium.com/v2/resize:fit:336/format:webp/1*gy0-sMEN5jeY9IV8kYff9A.png) $',
        
        '## 2) IntelliJ IDEA $',
        '![[book image !]](https://miro.medium.com/v2/resize:fit:332/format:webp/1*q1yhk92_qqFyCzlBeLuYYQ.png) $',
        'IntelliJ IDEA is an integrated development environment written in Java for developing computer software written in Java, Kotlin, Groovy, and other JVM-based languages. $',
        'It is developed by JetBrains and is available as an Apache 2 Licensed community edition, and in a proprietary commercial edition. $',
        
        '## 3) Visual Studio $',
        '![[book image !]](https://miro.medium.com/v2/resize:fit:336/format:webp/1*5oamzNK1fAV9J6_jQunSiw.png) $',
        'Visual Studio is an integrated development environment from Microsoft. It is used to develop computer programs including websites, web apps, web services, and mobile apps.'
    ]

    content = encodeURIComponent(JSON.stringify(content))
    return (
        <div className="max-w-2xl mx-auto px-4 py-8 blog">
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

            {/* <h1> 4) PyCharm</h1>
            <img src="https://miro.medium.com/v2/resize:fit:332/format:webp/1*t8zODaRSLZs7tb7P5-ZRzA.png" alt="py" />
            <p>
                PyCharm is an integrated development environment used for programming in Python. It provides code analysis, a graphical debugger, an integrated unit tester, integration with version control systems, and supports web development with Django.
            </p>

            <h1>5) Arduino IDE </h1>
            <img src="https://miro.medium.com/v2/resize:fit:318/format:webp/1*Lcy5kEHkzY80X_kHlb7WGg.png" alt="image" />
            <p>
                The Arduino Integrated Development Environment — or Arduino Software (IDE) — contains a text editor for writing code, a message area, a text console, a toolbar with buttons for common functions, and a series of menus. It connects to the Arduino hardware to upload programs and communicate with them.
            </p>

            <h1>6) X code</h1>
            <img src={"https://miro.medium.com/v2/resize:fit:396/format:webp/1*b5oH8oPs8d3UN0b1An6xkw.png"} />
            <p>
            Xcode is Apple’s integrated development environment for macOS, used to develop software for macOS, iOS, iPadOS, watchOS, and tvOS. It was initially released in late 2003.
            </p>

            <p>
                The latest stable release is version 14.2, released on December 13, 2022, via the Mac App Store with macOS Monterey.
            </p>

            <h1> 7) Code::Blocks </h1>
            <img src={"https://miro.medium.com/v2/resize:fit:162/format:webp/1*5jhE3sx1zRKQjQeZpKTDRw.png"} />
            <p>
                Code::Blocks is a free, open-source cross-platform IDE that supports multiple compilers including GCC, Clang, and Visual C++.
            </p>

            <p>
                It is developed in C++ using wxWidgets as the GUI toolkit. Using a plugin architecture, its capabilities and features are defined by the provided plugins.
            </p>

            <h1> 8) AWS Cloud 9 </h1>
            <img src="https://miro.medium.com/v2/resize:fit:332/format:webp/1*70DWKyAFyAAgJdndAEt9NQ.png" />
            <p>
                AWS Cloud9 is a cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser. It includes a code editor, debugger, and terminal.
            </p>

            <p>
                Cloud9 comes prepackaged with essential tools for popular programming languages, including JavaScript, Python, PHP, and more, so you don’t need to install files or configure your development machine to start new projects.
            </p> */}

            <Link href={{ pathname:"/create_post", query: {'content' : content} }} className="hover:bg-blue-600 hover:text-white mt-10  flex bg-white/50 p-2 rounded-sm w-fit">
                Apply template
            </Link>
        </div>
        
    )
}
