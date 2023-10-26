import React from 'react'

export default function RecentPostsError({error}) {

    const hideFetchErrorMessage = () => document.getElementById("recentPostErrorMessage").style.display = "none"

    return (
        <div id="recentPostErrorMessage" className="text-lg w-fu py-3 flex items-center ml-4 gap-x-4 justify-center px-4 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
            <p>{error}</p>
            <span onClick={hideFetchErrorMessage} className=" ">
                <svg className="w-6 h-6 fill-current" role="button" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            </span>
        </div>
    )
}
