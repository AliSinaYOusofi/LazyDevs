"use client"
import React, {useState, useEffect} from 'react'

export default function SortData({sortedBy, setSortedBy}) {

    const [searchFlag, setSearchFlag] = useState(undefined)

    useEffect(() => {

        if (! searchFlag) setSearchFlag("date")

        const handleSortChange = () => {

            if (searchFlag === "likes") {
                setSortedBy( likes => likes.slice().sort((a, b) => b.likes - a.likes) )
            }
            
            else if (searchFlag === "date") {
                setSortedBy( date => {
                    const blogsSortedByDate = date.slice().sort( (a, b) => {
                        const firstDate = new Date(a.createdAt)
                        const secondDate = new Date(b.createdAt)
                        return secondDate - firstDate 
                    })
        
                    return blogsSortedByDate
                })
            } 
            
            else if (searchFlag === "viewcount") {
                setSortedBy( viewCount => {
                    const sortedByViewCount = viewCount.slice().sort( (a, b) => b.viewCount > a.viewCount)
                    return sortedByViewCount
                })
            }

            else if (searchFlag === "comment") {
                setSortedBy( comment => {
                    const sortedByComment = comment.slice().sort( (a, b) => b.comments.length > a.comments.length)
                    return sortedByComment
                })
            }
        }

        handleSortChange()
    }, [searchFlag])
    
    return (
        <div className="mt-10">
            
            <span className="">Select Sort options : </span>
            
            <select defaultValue={"Title"} className="py-3 px-5 rounded-lg border-none bg-white w-[10rem] outline-none" onChange={(e) => setSearchFlag(e.target.value)}>
                <option value="likes" defaultValue={"likes"}>Likes</option>
                <option value="date">Date</option>
                <option value="viewcount">View</option>
                <option value="comment">comment</option>
            </select>
        </div>
    )
}
