"use client"
import React, {useState, useEffect} from 'react'

export default function SortUsers({sortedBy, setSortedBy}) {

    const [searchFlag, setSearchFlag] = useState(undefined)

    useEffect(() => {

        if (! searchFlag) setSearchFlag("joined")

        const handleSortChange = () => {

            if (searchFlag === "joined") { // sort by joined date

                setSortedBy( date => {
                    
                    const blogsSortedByDate = date.slice().sort( (a, b) => {
                        
                        const firstDate = new Date(a.joined)
                        const secondDate = new Date(b.joined)
                        return secondDate - firstDate 
                    })
        
                    return blogsSortedByDate
                })
            } 
            
            else if (searchFlag === "post") { // sort by the number of posts
                
                setSortedBy( viewCount => {
                    const sortedByNumberOfPosts = viewCount.slice().sort( (a, b) => b.numberOfPosts > a.numberOfPosts)
                    return sortedByNumberOfPosts
                })
            }

            else if (searchFlag === "follower") { // sort by the number of follower
                
                setSortedBy( comment => {
                    const sortedByComment = comment.slice().sort( (a, b) => b.numberOfFollowers > a.numberOfFollowers)
                    return sortedByComment
                })
            
            }

            else if (searchFlag === "following") { // sort by the number of follower
                
                setSortedBy( comment => {
                    const sortedByComment = comment.slice().sort( (a, b) => b.numberOfFollowing > a.numberOfFollowing)
                    return sortedByComment
                })
            
            }
        }

        handleSortChange()
    }, [searchFlag])
    
    return (
        <div className="mt-10">
            <span className="">Select Sort options : </span>
            <select defaultValue={"joined"} className="py-3 px-5 rounded-lg border-none bg-white w-[10rem] outline-none" onChange={(e) => setSearchFlag(e.target.value)}>
                <option value="joined" defaultValue={"joined"}>Joined</option>
                <option value="post">post</option>
                <option value="follower">Followers</option>
                <option value="following">Following</option>
            </select>
        </div>
    )
}
