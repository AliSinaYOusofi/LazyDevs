"use client";

import React from 'react'

class About extends React.Component {
    
    render() {

        return (
            <div className="md:w-1/2 shadow-black/20 shadow-sm p-4">
                
                <h1 className="text-2xl flex items-center">
                    Made with
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/520/520459.png"
                        alt="heart image"
                        className="w-5 h-5 flex items-center mt-2 ml-2"
                    />
                </h1>
                <h1 className="font-extrabold text-5xl mt-3"> 
                    About LazyDevs
                    
                </h1>
                <p className="mt-2">
                    The blogging website built by three developers using Next.js, 
                    Node.js, Express.js, MongoDB, and Tailwind CSS is a modern and efficient 
                    platform that enables users to create, publish, and share their blog posts with the world.
                </p>
    
                <p className="mt-6">
                    The front-end of the website is built using Next.js, a 
                    popular React-based framework for building server-side rendered web 
                    applications. Next.js provides several features that are essential for a modern web 
                    application, including efficient page rendering, automatic code splitting, 
                    and built-in SEO optimization. The website's user interface is designed using Tailwind CSS, 
                    a popular utility-first CSS framework that provides a range of pre-built components and styles
                    that make it easy to create beautiful and responsive designs.
                </p>
    
                <h1 className="font-extrabold text-2xl mt-4"> Front-end Techs Used </h1>
                <p className="mt-2">
                    The back-end of the website is built using Node.js and Express.js, 
                    two popular technologies for building scalable and efficient web applications. 
                    Express.js is a lightweight and flexible framework that provides several features 
                    that are essential for building modern web applications, including middleware support, 
                    routing, and server-side rendering. Node.js provides a high-performance runtime environment 
                    that allows the website to handle a large number of concurrent connections and requests.
                </p>
    
                <h1 className="font-extrabold text-2xl mt-4"> Back-end Techs Used </h1>
                <p className="mt-2">
                    The website's data is stored in MongoDB, a popular NoSQL database 
                    that provides a flexible and scalable data storage solution. 
                    MongoDB's document-based data model allows developers to store complex data structures and 
                    perform complex queries with ease, making it an ideal choice for modern web applications.
                </p>
            </div>
        )
    }
}

export default About;