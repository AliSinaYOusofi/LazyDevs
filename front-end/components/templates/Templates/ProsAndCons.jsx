import React from 'react'

export default function ProsAndCons({pros, cons}) {

    return (
        <div className="w-fit bg-yello bg-yellow-200 rounded-md flex flex-col mx-auto p-10 my-4">
            <h1 class="flex items-center">

                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </span>
                
                <span className="text-2xl font-bold"> Pros</span>
            </h1>

            <ul>
                {
                    pros.map(pro => <li className="mb-2 list-disc ml-10">{pro}</li>)
                }
            </ul>
            
            <h1 class="flex items-center"> <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </span>
                <span className="text-2xl font-bold"> Cons</span>
            </h1>

            <ul>
                {
                    cons.map(pro => <li className="mb-2 list-disc ml-10"> {pro} </li>)
                }
            </ul>

        </div>
    )
}
