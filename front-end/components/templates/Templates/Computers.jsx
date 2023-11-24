import React, { useRef } from 'react'
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation'

export default function Computers() {

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
                <h1> The best laptops for programming in 2023</h1>
                <p> Our ultimate pick of the best laptops for programming money can buy, chosen by our expert reviewers. These laptops are perfect for coding, with glorious screens and ample battery life. </p>

                <p>This roundup of the best laptops for programming is ideal if you do a lot of coding. All the laptops on this guide combine portability, flexibility and power in a thin and light package. Since modern machines are becoming more powerful every year, they're all capable of managing every complex task you could throw at it. </p>

                <p> We've personally tested every single laptop on this page, running tests on speed, performance, power, display and battery life and ensuring every machine meets the standards needed for heavy coding work (see how we test laptops for more). Our vast experience with laptops mean we are perfectly placed to advise you on which laptop is perfect for you – and we've taken price and portability into account where appropriate.</p>

                <img src={"https://cdn.mos.cms.futurecdn.net/Nos3e7TU4vQJUeGF7jkrBd-1200-80.jpg.webp"} alt="image" />
                <h1> 01. MacBook Pro 16-inch (M2, 2023) </h1>

                <p>
                    The MacBook Pro is the most powerful and most versatile laptop ever built. It's a powerful, fast, and elegant machine. It's the perfect machine for coding, and it's the perfect machine for all your daily tasks.
                </p>

                <p> The release of the new M2 MacBook Pro 16-inch was a blessing for programmers as it combines the incredible power of the new Apple chip with a brilliantly large and bright screen (1,600 nits, if you're asking). This means no squinting at a small screen with zero compromise on power and speed, hurrah. However, if you do want a smaller screen, the M2 MacBook Pro also comes in 13-inch and 14-inch versions, both of which we love.</p>
                <p> You'll have more than enough battery to get you through the most intense coding session – this delivers an impressive 22 hours. In our review, we appreciated that there are a bunch of ports including HDMI and a memory card slot, so you can plug a second screen in directly and up your memory, too. There's also ProMotion and HDR (High Dynamic range).</p>

                <img src={"https://cdn.mos.cms.futurecdn.net/JScX3giLpSkc7d6we78p7Q-1200-80.jpg.webp"} alt="image" />
                <h1> 02. Razer Blade 17 (2022)  </h1>
                <p>The Razer Blade 17 is a fantastic laptop for coding on if you're working on games. Razer is a big name in PC gaming, and this laptop comes with Nvidia's latest Nvidia GeForce RTX 3080 Ti laptop GPU, which is extremely powerful. This allows you to work with complex 3D games that use cutting-edge tech, like ray tracing, and you'll be able to play your game afterwards to test how it runs.</p>
                <p>It's not just a gaming laptop, however, as it's built for creative professionals, and this means if you're a programmer working on heavy-duty projects, this is a laptop well worth considering. It's very expensive, but for your money you're getting some of the best mobile tech available right now. Combined with a great build quality and stunning 17-inch screen, this is a brilliant creative workstation for people who need a lot of power. Read our Razer Blade 17 review for more information.</p>

                <img src={"https://cdn.mos.cms.futurecdn.net/hR6EvZDsSxXuYkYtYvyRqW-1200-80.jpg.webp"} alt="image" />
                <h1> 03. Dell Precision 5470  </h1>
                <p>The Dell Precision 5470 laptop may be smaller than others on the list, but it comes loaded with a huge amount of power for its compact frame. In fact, our testing put its performance close to that of a 14-inch MacBook Pro with Apple’s M2 Pro chip, which is a superb laptop chip for graphic design work. Our reviewer loved it, and she is an official Apple obsessive – so that's saying something!</p>
                <p className="mb-10">We got over 12 hours of battery life from Dell’s Precision 5470 in our review, and the comfortable keyboard serves up an enjoyable typing experience. It’s all wrapped up in a superbly well-made chassis that feels well-built and exudes quality. So if you want portable power and are put off by some of the larger laptops on the market, Dell’s offering could be right up your street.</p>
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
