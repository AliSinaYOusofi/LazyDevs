import Social from "../SocialIcons/Social";

export default function Footer () {
    return (
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="flex justify-between md:flex-row flex-col gap-y-4">
                <div className="sm:col-span-2">
                    <a
                    href="/"
                    aria-label="Go home"
                    title="Company"
                    className="inline-flex items-center"
                    >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                    <span className="ml-2 text-xl font-bold tracking-wide text-indigo-800 uppercase">
                        LazyDevs
                    </span>
                    </a>
                    <div className="mt-6 lg:max-w-sm">
                    <p className="text-sm text-gray-800">
                        The website is an online community exclusively for developers, 
                        where they can share their knowledge, experience, and insights 
                        with like-minded professionals from around the world. 
                        Members can create and publish blog posts, tutorials, 
                        and code snippets on a wide range of topics related to software 
                        development, programming languages, frameworks, and tools. 
                    </p>
                    <p className="mt-4 text-sm text-gray-800">
                        The website also features discussion forums, Q&A sections, and a 
                        job board, allowing members to connect, collaborate, and advance their careers in the tech industry.
                    </p>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <p className="text-base font-bold tracking-wide text-gray-900">
                    Contacts
                    </p>
                    <div className="flex">
                    <p className="mr-1 text-gray-800">Phone:</p>
                    <a
                        href="tel:850-123-5021"
                        aria-label="Our phone"
                        title="Our phone"
                        className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        +93 731-055-068
                    </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Email:</p>
                        <a
                            href="mailto:info@lorem.mail"
                            aria-label="Our email"
                            title="Our email"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            senayousofiali@gmail.com
                        </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Address:</p>
                        <a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Our address"
                            title="Our address"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            312 Lovely Street, LazyDevs
                        </a>
                    </div>
                
                    <Social />
                </div>
                
            </div>
            
            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                <p className="text-sm text-gray-600">
                    © Copyright {new Date().getFullYear()} LazyDevs Inc. All rights reserved.
                </p>
                <ul className="flex gap-y-2 flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    <li>
                        <a
                            href="/"
                            className="transition-all duration-700 md:p-2 p-1 hover:shadow-md shadow-inner shadow-black/10 rounded-full"
                        >
                        F.A.Q
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className="transition-all duration-700 md:p-2 p-1 hover:shadow-md shadow-inner shadow-black/10 rounded-full"
                        >
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className="transition-all duration-700 md:p-2 p-1 hover:shadow-md shadow-inner shadow-black/10 rounded-full"
                        >
                            Terms &amp; Conditions
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}