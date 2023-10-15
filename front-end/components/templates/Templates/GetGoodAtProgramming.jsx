import ApplyButton from '@/components/ApplyThemeButton/ApplyButton'
import Link from 'next/link';
import React from 'react'

export default function GetGoodAtProgramming() {

    const buttonTexts = [
        '# 9 Tips to Become a Better Programmer or Software Developer in 2023. 10',
        'To become a better programmer, you need to be good at the data structure, algorithms, designing using OOP, multi-threading, and various programming concepts like Recursion, divide and conquer, prototyping, and unit testing.',
        'Programming is a combination of many skills, which means it’s not possible to learn it in a quick time instead, it will come with time and experience, but that won’t happen automatically.',
        'You can spend five years doing a Java programming job without being a good programmer. Since most Java interviews focus on theory rather than programming and coding skills.',
        'Not many programmers practice these essential programming skills. If there is a mandatory problem-solving programming test, I will bet the average programmer would have been much better. Anyway, here is my list of things that can help you become a good programmer. 10',
        '## 1. Coding, Coding, and Coding. 10',
        'Why have I put coding at the top of this list? Because it’s the most difficult and, at the same time, its central piece of programming. 10',
        'By doing coding, you also realize your mistakes in designing, error handling, threading, and then go back to those respective skills to improve. You just can not work in designing only; coding produces output, which is vital to learn and act as a success.',
        'Not many programmers practice these essential programming skills. If there is a mandatory problem-solving programming test, I will bet the average programmer would have been much better. Anyway, here is my list of things that can help you become a good programmer.',
        '## 2. Reading Books',
        'Coding is easier said than done, and there is a massive difference between good code and bad code, but how do you know? You cannot understand the difference until you have seen a good code and know why a particular code is good.',
        'This is where books come to help; more often than not, authors are great programmers themselves. They offer their experience in the form of a book. I love books, but one book that particularly helped me is Clean Code by Uncle Bob. 10',
        '![book image !]](https://miro.medium.com/v2/resize:fit:482/format:webp/0*L-bFz-bz58fh63LJ.jpg)'
    ];

    const content = encodeURIComponent(JSON.stringify(buttonTexts))

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 blog">
            <h1 className="mt-4 font-extrabold text-3xl"> 9 Tips to Become a Better Programmer or Software Developer in 2023</h1>
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

            <h2> 6. Reading Code </h2>
            <p>
                If reading blogs help to become a good programmer, then reading code help more than that; but at the same time, reading a blog is easy, but reading the code is tough. Do you see resistance? Then you should do it.
            </p>

            <p>
                Look at the code of open source projects, your fellow programmer’s code, your existing proprietary code, code from Java SDK, and try to understand how they work; try to see what they are doing and why they are doing it.
            </p>

            <p>
                Find patterns, develop navigation skills; initially, you will find it boring and difficult, but with time you will develop a good code sense, which will alert you when you make a mistake, help you spot others’ mistakes, gaps, and code smell.
            </p>

            <img src={"https://miro.medium.com/v2/resize:fit:640/format:webp/0*D3aBdj0YUe5l9eMc.jpg"} alt="programming fact" />
            
            <h3> 7. Writing Unit tests </h3>

            <p>
            The unit test complements the thinking and coding process and subsequently helps you to design better. Anything difficult to test has a chance of improvement. Also, writing unit tests helps a lot in finding better names, better abstraction, better interface, abstract class design, and overall improves code quality.

            </p>

            <p>
                But like coding and designing, unit testing is also a tough job for average programmers, you will see a lot of resistance there. Some programmer writes trivial test instead of thinking hard about usage scenario.
            </p>

            <p>
                Remember, there is no substitute for thinking through the process, after analysis, design, and development, unit testing is another opportunity to think through scenarios and gaps in your code. Make it a rule; always write a Unit test for your code.
            </p>

            <p>
                If you want to learn Unit testing in Java, I suggest you learn JUnit and Mockito, two essential frameworks for unit testing in Java, and if you need a course, I suggest you join the JUnit 5 in 20 steps course by Ranga Karnan on Udemy.
            </p>

            <img src={"https://miro.medium.com/v2/resize:fit:1100/format:webp/0*-qS-g0HY0lY5bT-6.jpeg"} alt="image" />

            <h2> 8. Doing Code reviews </h2>

            <p>
                Like Unit testing, Code review is another development practice that helps to become a good solid programmer. Code review helps both reviewer and author; the reviewer improves his code sense and offers genuine advice while the author learns from his mistakes.
            </p>

            <p>
            It often helps that the code you think is rock solid has some bugs which only other programmers can see, Code review and four eye check does that for you.
            </p>

            <p>
                If you are lucky and get a chance to work in a company that has unit testing, code review as a discipline, then you are likely to be a better programmer than the rest. These two things immensely help to improve programming skills.
            </p>

            <p>
                If you are wondering what to check on Code reviews, I suggest you check if the code is functionally correct, if standard practices have been followed like SOLID design principles and Java naming conventions. Another thing you can check is if there are enough unit tests or not, which are often neglected.
            </p>

            <h2> 9. Talking to a fellow programmer </h2>
            <p>
                Reading is a passive event compared to talking. Talking about a program and discussing that with a fellow programmer often leads to a better solution; it’s natural because your mind tends to involve more when you talk and listen to others.
            </p>

            <p>
                I found gaps, missing requirements, bugs, and design flaws while discussing with teammates. In the software industry, where programmers tend to isolate themselves with their computers, talking, sharing, and doing whiteboard sessions helps immensely.
            </p>

            <p>
                Don’t just sit and code, talk, listen, think, and hang out with fellow programmers. Participating in the event also helps. You may also get some useful and practice tips to become a better developer overnight, like this one :-)
            </p>

            <img src={"https://miro.medium.com/v2/resize:fit:640/format:webp/0*ELYaEYn-PQ2rdGYz.jpg"} alt="programming joke" />
            
            <Link href={{ pathname:"/create_post", query: {'content' : content} }} className="hover:bg-blue-600 hover:text-white mt-10  flex bg-white/50 p-2 rounded-sm w-fit">
                Apply template
            </Link>
        </div>
    )
}
