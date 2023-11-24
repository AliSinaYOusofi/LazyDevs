import React, { useRef } from 'react'
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation'


export default function GoogleTips() {
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
                <h1> 4 Google Search Tips to Use Google More Efficiently </h1>
                <p>Millions of people use Google search every day for a variety of reasons. Students use it for school, business people use it for research, and millions more use it for entertainment. But most people may not be using Google search to its full potential. </p>
                <p>Want to use Google search more efficiently and get the search results you want quickly? Here are 20 Google search tips and tricks to maximize your search efficiency:</p>

                <h1> 1. Use the tabs </h1>
                <p>The first tip is to use the tabs in Google search. On the top of every search are a number of tabs. Usually you’ll see Web, Image, News, and More. Using these tabs, you can help define what kind of search you need to do.</p>
                <p>It’s rudimentary and most people use the tabs already. If you are not, then it’s highly recommended to get associated with them. They can cut search times dramatically if utilized properly.</p>

                <h1> 2. Use quotes</h1>
                <p> When searching for something specific, try using quotes to minimize the guesswork for Google search. When you put your search parameters in quotes, it tells the search engine to search for the whole phrase.</p>
                <p> For instance, if you search for Puppy Dog Sweaters, the engine will search for content that contains those three words in any order.</p>

                <p> However, if you search “Puppy Dog Sweaters”, it will search for that phrase exactly as you typed it. This can help locate specific information that may be buried under other content if not sorted out correctly.</p>

                <h1> 3. Use a hyphen to exclude words </h1>
                <p> Sometimes you may find yourself searching for a word with an ambiguous meaning. An example is Mustang. When you Google search for Mustang, you may get results for both the car made by Ford or the horse. If you want to cut one out, use the hyphen to tell the engine to ignore content with one of the other. See the example below. </p>
                <ul>
                    <li> Mustang -cars</li>
                </ul>

                <p> This tells the search engine to search for mustangs but to remove any results that have the word “car” in it. It can be wildly helpful when finding information about something without getting information about something else. </p>

                <h1> 4. Use a colon to search specific sites</h1>
                <p>There may be an instance where you need to Google search for articles or content on a certain website. The syntax is very simple and we’ll show you below.</p>

                <ul>
                    <li> Sidney Crosby site:nhl.com</li>
                </ul>

                <p> This will search for all content about famous hockey player Sidney Crosby, but only on NHL.com. All other search results will be removed. If you need to find specific content on a particular site, this is the shortcut you can use. </p>
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
