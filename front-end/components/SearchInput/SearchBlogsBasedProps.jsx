"use client"
import React from 'react'
import { useState } from 'react'
import FetchPostError from '../Error/FetchPostError/FetchPostError'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function SearchBlogsBasedProps({blogs, size, showTitle}) {

    const [searchFlag, setSearchFlag] = useState('Title')
    const [searchText, setSearchText] = useState('')
    const [result, setResult] = useState(0)
    
    const handleCharacterChange = (e) => {
        
        e.preventDefault();
        setSearchText(e.target.value)

        if (searchFlag === 'Title') searchByTitle(e.target.value)
        else if (searchFlag === 'Body') searchByBody(e.target.value)
    }

    function escapeRegExp(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function hideUnHideElements (display, posts) {
        
        posts.forEach(blog => {
            const element = document.getElementById(blog._id)
            if (element) element.style.display = display

        })
    }

    const searchByTitle = (text) => {
        
        if (text) {
            const escapeSpecailChars = escapeRegExp(text)
            const searchRegex = new RegExp(escapeSpecailChars, 'i'); 
            
            const matchingBlogs = blogs.filter((blog) => searchRegex.test(blog.title));
            const unmatchedBlogs = blogs.filter( blog => !matchingBlogs.includes(blog))
            
            if (matchingBlogs.length > 0) {
                    
                hideUnHideElements("block", matchingBlogs)
                hideUnHideElements("none", unmatchedBlogs)
                setResult(matchingBlogs.length)
                
            } 
            
            else {
               
                hideUnHideElements("none", unmatchedBlogs)
                setResult(0)
            }

        } 
        
        else {
            hideUnHideElements("block", blogs)
        }
    }

    const searchByBody = (text) => {
        if (text) {
            
            const escapeSpecialChars = escapeRegExp(text);
            const searchRegex = new RegExp(escapeSpecialChars, 'i');
            
            const matchingBlogs = blogs.filter((blog) => searchRegex.test(blog.body));
            const unmatchedBlogs = blogs.filter((blog) => !matchingBlogs.includes(blog));
            
            if (matchingBlogs.length > 0) {
                hideUnHideElements("block", matchingBlogs);
                hideUnHideElements("none", unmatchedBlogs);
                setResult(matchingBlogs.length);
            } 
            else {
                hideUnHideElements("none", unmatchedBlogs);
                setResult(0);
            }
        } else {
            hideUnHideElements("block", blogs);
        }
    }


    const handleCtrlK = (e) => {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault();
          // Set focus on the search input element
          document.getElementById('searchInput').focus();
        }
    };
    
    useEffect(() => {
        document.addEventListener('keydown', handleCtrlK);
        return () => {
          document.removeEventListener('keydown', handleCtrlK);
        }
    }, [])

    const handleClickonSearchButton = () => {
        if (!searchText) return toast.info("Enter something to search for.")
        document.getElementById("searchResult")?.scrollIntoView({"behavior": "smooth"})
    }
    return (

        <>
            <div  className={`flex md:${size ? "flex-col" : "flex-row"} flex-col items-center p-6 space-x-6 bg-white rounded-xl`}>
                
                <div className="flex relative bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                
                    <input onChange={handleCharacterChange} className="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." id={"searchInput"}/>
                    
                    <div className="absolute right-2  bg-white rounded-full p-1 items-center text-xs text-gray-400 mr-4">
                        <kbd>Ctrl</kbd> + <kbd>K</kbd>
                    </div>
                </div>
                
                {
                    showTitle ? <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                
                        <select defaultValue={"Title"} className="py-3 px-4 rounded-lg border-none outline-none" onChange={(e) => setSearchFlag(e.target.value)}>
                            <option value="Title" defaultValue={"Title"}>Title</option>
                            <option value="Body">Body</option>
                        </select>
                
                        </div> : 
                        null
                }
                
                <button type="button" onClick={handleClickonSearchButton} className={`${showTitle ? "mt-0" : "mt-2"} bg-gray-800 md:h-10 h-8 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer`}>
                    <span>Search</span>
                </button>
            </div>

            {  
                searchText?.length > 0
                ?
                (

                    result > 0
                    ? 
                    <div className="mt-4">
                        <h1 className="md:text-5xl text-3xl  font-bold tracking-wide mt-10 md:mt-0"> Search Results </h1>
                        <p className="mt-2 " id="searchResult"> {result} result(s) found for "{searchText}" keyword(s). </p>
                    </div>
                    : <div className="mt-4"> <FetchPostError error={"The term you searched returned zero results"} /> </div>
                ):
                    null

            }
        </>
    )
}
