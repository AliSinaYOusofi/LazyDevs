import ApplyButton from '@/components/ApplyThemeButton/ApplyButton'
import Link from 'next/link';
import React, { useRef } from 'react'
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation';

export default function GetGoodAtProgramming() {

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
                <h1 className="mt-4 font-extrabold text-3xl"> 5 Tips to Become a Better Programmer or Software Developer in 2023</h1>
                <p>
                    To become a better programmer, you need to be good at the data structure, algorithms, designing using OOP, multi-threading, and various programming concepts like Recursion, divide and conquer, prototyping, and unit testing.
                </p>

                <p>
                    Programming is a combination of many skills, which means it’s not possible to learn it in a quick time instead, it will come with time and experience, but that won’t happen automatically.
                </p>

                <p>
                    You can spend five years doing a Java programming job without being a good programmer. Since most Java interviews focus on theory rather than programming and coding skills.
                </p>

                <p>
                    Not many programmers practice these essential programming skills. If there is a mandatory problem-solving programming test, I will bet the average programmer would have been much better. Anyway, here is my list of things that can help you become a good programmer.
                </p>

                <h2> 1. Coding, Coding, and Coding </h2>
                
                <p>
                    Why have I put coding at the top of this list? Because it’s the most difficult and, at the same time, its central piece of programming.
                </p>

                <p>
                    By doing coding, you also realize your mistakes in designing, error handling, threading, and then go back to those respective skills to improve. You just can not work in designing only; coding produces output, which is vital to learn and act as a success.
                </p>

                <p>
                    By the way, do not stop just after solving the problem, it’s always better to throw away your first solution, that is just a prototype, your next solution should address issues, missing requirements that you have found building a prototype.
                </p>

                <p>
                    You can also see this Clean Code course by Maximillian Schwarzmuller for JavaScript developers and Clean Code with Java: Learn Simple Design, Refactoring & TDD course for Java developers to learn more about writing production-quality code which can stand the test of time.
                </p>
                
                <h2> 2. Reading Books </h2>
                <p>
                    Coding is easier said than done, and there is a massive difference between good code and bad code, but how do you know? You cannot understand the difference until you have seen a good code and know why a particular code is good.
                </p>
                
                <p>
                    This is where books come to help; more often than not, authors are great programmers themselves. They offer their experience in the form of a book. I love books, but one book that particularly helped me is Clean Code by Uncle Bob.
                </p>

                <img src={"https://miro.medium.com/v2/resize:fit:482/format:webp/0*L-bFz-bz58fh63LJ.jpg"} alt="programming book" />
                
                <p>
                    By reading this book, I have found myself finding problems in my code and applying the advice given in this book every now and then. My advice is if you ever find such books, grab them. I also recommend reading these classic books many times and refer them every now and then.
                </p>

                <h2> 3. Practicing Data Structure, Algorithms, and System Design problems </h2>


                <p>
                    I thought of putting that as the second item, but it ended up third. In my opinion, this is the most critical of things to do to become a better programmer. Most of the good programmers I have seen and met are really good in data structures, algorithms, and Computer Science basics.
                </p>

                <p>
                    By learning these things, you take better advantage of what is available. Since data structure is a key piece of any program, solid knowledge of them helps during problem-solving.
                </p>

                <p>
                    Similarly, knowledge of key programming principles, search and sorting algorithms, and other well-known algorithms develop programming skills for you.
                </p>

                <img src={"https://miro.medium.com/v2/resize:fit:1100/format:webp/1*odNs-yx5RYj8Vdhzm2GEsA.png"} alt="image of dsa" />

                <p>
                    Another thing that is crucial to becoming a better developer is to learn about System design and Software architecture. This is one thing that can be the difference between a programmer with 10 years of experience and an experienced programmer.
                </p>

                <p>
                    You should be familiar with how the system works, how their individual part collaborates, different architectures like Microservices and Monolith, their pros and cons, etc.
                </p>

                <h2> 4. Open Source Contribution </h2>
                <p>
                    Contributing to the Open source code, especially from Apache, Google, and some other projects is another way to improve your programming skills and become a better programmer. Just signing their mailing list and the following discussion teaches you a lot.
                </p>

                <p>
                    Since most of the discussions happen between good programmers, listening to them and understanding the problem and their approach, solution, and view automatically develops good programming habits.
                </p>

                <p>
                    To get most of it, do not just sit passive, ask questions, offer your view, but also value others. If you are wondering how to start with open source contribution, then here are some nice articles from Medium to learn about open source contribution
                </p>

                <h2> 5. Reading Good Blogs </h2>

                <p>
                    Reading good blogs is a small part of reading books. How does reading blogs help you to become a better programmer? Well, it does. Since blogs are often written by programmers themselves, and most of them share their personal views, experience, you often find them relevant.
                </p>

                <p>
                    Also, blogs are a small piece of information, so it digests well. A blog also helps learn new technology and new features of existing language and API.
                </p>

                <p>
                    Many times, I have seen something subtle or missed things from a really well-known part of Java described in a small blog post. When it comes to reading good development articles, I prefer to go to websites like Dev.to, FreeCodecamp, and Medium, particularly some dev-focused publications.
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
