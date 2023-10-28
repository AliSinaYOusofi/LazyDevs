"use client"
import React from 'react'
import { useState } from 'react'
import FetchPostError from '../Error/FetchPostError/FetchPostError'
import { useEffect } from 'react'

export default function SearchBlogsBasedProps({blogs}) {

    const [searchFlag, setSearchFlag] = useState('Title')
    const [searchText, setSearchText] = useState('')
    const [result, setResult] = useState(0)
    
    const handleCharacterChange = (e) => {
        
        e.preventDefault();
        setSearchText(e.target.value)

        if (searchFlag === 'Title') searchByTitle(e.target.value)
        else if (searchFlag === 'Body') searchByBody()
        else if (searchFlag === 'Most occurring') SearchByMostOccuring()
    }

    const searchByTitle = (text) => {
        
        if (text) {
            
            const searchRegex = new RegExp(text, 'i'); // 'i' for case-insensitive match
            const matchingBlogs = blogs.filter((blog) => searchRegex.test(blog.title));
        
            if (matchingBlogs.length > 0) {
                blogs.filter((blog) => !matchingBlogs.includes(blog)).forEach(blog => document.getElementById(blog._id).style.display = "none")
                setResult(matchingBlogs.length)
            } 
            
            else {
                console.log('No matching blogs found');
            }

        } 
        
        else {
            blogs.forEach(blog => document.getElementById(blog._id).style.display = "block")
        }
    }

    const searchByBody = (text) => {
        alert("searching by body")
    }

    const SearchByMostOccuring = (text) => {
        alert("searching by occuring")
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
    return (

        <>
            <div className="flex md:flex-row flex-col items-center p-6 space-x-6 bg-white rounded-xl">
                
                <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    <input onChange={handleCharacterChange} className="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." id={"searchInput"}/>
                    
                    <div className="flex items-center text-xs text-gray-400 mr-4">
                        <kbd>Ctrl</kbd> + <kbd>K</kbd>
                    </div>
                </div>
                
                <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                
                    <select className="py-3 px-4 rounded-lg border-none outline-none" onChange={(e) => setSearchFlag(e.target.value)}>
                        <option value="Title" selected>Title</option>
                        <option value="Body">Body</option>
                        <option value="Most occurring">Most occuring</option>
                    </select>
            
                </div>
                
                <div onClick={handleCharacterChange} className="bg-gray-800 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                    <span>Search</span>
                </div>
            </div>

            {  
                searchText.length > 0
                ?
                (

                    result > 0
                    ? 
                    <div className="mt-4">
                        <h1 className="md:text-5xl text-3xl  font-bold tracking-wide mt-10 md:mt-0"> Search Results </h1>
                        <p className="mt-2 "> {result} results found for "{searchText}" keyword(s) </p>
                    </div>
                    : <div className="mt-4"> <FetchPostError error={"No result"} /> </div>
                ):
                    null

            }
        </>
    )
}
