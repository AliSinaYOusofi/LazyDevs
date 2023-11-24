import React, { useRef } from 'react'
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation'

export default function ProgrammingBooks() {

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
                <h1> 7 Best Programming Books You Need to Read</h1>
                <p> Programming is the art of creating innovative solutions in the form of computer programs for solving problems that vary across a wide spectrum of fields, ranging from classic mathematical puzzles and everyday life issues to weather forecasting and seeking and understanding novel marvels across the cosmos.</p>

                <p>Although programming and coding are typically used interchangeably, programming is not just coding. Coding represents that part of programming, which involves writing computer code.</p>
                <p>Programming, on the other hand, is a wider process that also involves the approach of coming up with ideas to develop a program as well as the testing of the same and much more. Check out this detailed coding vs programming comparison.</p>


                <h1> Best Programming Books</h1>
                <p>Programming is one of the most sought-after professional fields in the world. It presents candidates with a galore of opportunities to learn and earn. It, however, requires continuous learning and what can be better than books to learn from!</p>

                <p>So, here is our pick of 10 best programming books to step-up your game:</p>

                <h1> 1. Clean Code: A Handbook of Agile Software Craftsmanship </h1>

                <img src={"https://cdn.hackr.io/uploads/posts/attachments/clean-code-a-handbook-of-agile-software-craftsmanship-1st-edition.webp"} alt="image" />
                <p> Programming is about polishing the craft with years of trial and error. I wish there was a way to save yourself from all the hard work by learning from the mistakes of other programmers? Fortunately, there is, and it is known to the world as the Clean Code: A Handbook of Agile Software Craftsmanship book from the legendary Uncle Bob.</p>

                <p> The clean code offers invaluable insights into code cleaning and software development. It has thorough, step-by-step explanations on cleaning, writing, and refactoring code. The programming book has a galore of practical examples about the how and why of writing clean code. </p>

                <p> Post successful completion of the Clean Code book, you will be able to effortlessly implement Agile methodology, one of the leading forms of SDLC, in your software development projects. Also, you will find yourself to be a more resolute, disciplined programmer than before. </p>

                <h1> 2. Introduction to Algorithms </h1>
                <p>The name of the book is self-explanatory. It is what the title suggests, i.e., Introduction to Algorithms. Also known as CLRS, a reference to the last name of the authors of the book, it goes in-depth into a range of algorithms divided across several self-contained chapters. </p>
                <img src={"https://cdn.hackr.io/uploads/posts/attachments/introduction-to-algorithms-eastern-economy-edition.webp"} alt="image" />
                <p> All the algorithms discussed in the Introduction to Algorithms book are amply explained. They are presented using pseudocode, readable by programmers of all skill levels, even those who are relatively new to programming.</p>

                <p> Aside from that, the latest edition of the Introduction to Algorithms book also adds an appendix on matrices and considerable addition to the chapter focusing on recurrence (divide-and-conquer), and much more. </p>

                <h1> 3. Structure and Interpretation of Computer Programs (SICP) </h1>
                <p> The Structure and Interpretation of Computer Programs, a.k.a. SICP is among the best books to learn the fundamentals of programming. Employed as a foundational course to programming at MIT, SICP is a generic programming book that uses Scheme to illustrate the various programming concepts.</p>
                <img src={"https://cdn.hackr.io/uploads/posts/attachments/structure-and-interpretation-of-computer-programs-2nd-edition-mit-electrical-engineering-and-computer-science1.webp"} alt="Image" />
                <p> Although SCIP is a must-have book for programmers, going through it will be a far better experience after, thoroughly, learning one or two programming languages. Of course, the book offers a solid programming foundation, and also deals with functional programming. </p>

                <p> Completing The Structure and Interpretation of Computer Programs book is an ordeal. The book features a galore of hands-on exercises to help the readers win through it. </p>

                <h1> 4. The Clean Coder: A Code of Conduct for Professional Programmers </h1>
                <p>Compiled by the seasoned software engineer and author Robert C. Martin a.k.a. Uncle Bob, The Clean Coder book covers the practices, techniques, and tools of true software craftsmanship. The book not only tells you how to write clean code but also how to build the attitude of a skilled professional programmer.</p>
                <img src={"https://cdn.hackr.io/uploads/posts/attachments/the-clean-coder.webp"} alt="image" />
                <p>The Clean Coder is ideal reading for those looking to learn the aspects of being a professional programmer in a hard-yet-efficient way. It is full of practical advice for everything related to programming, from coding and refactoring to testing.</p>

                <p> The Clean Coder has helped hundreds of thousands of developers become much more passionate and proficient in their craft. Don’t buy it? Start reading the programming book today and know the difference for yourself. </p>
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
