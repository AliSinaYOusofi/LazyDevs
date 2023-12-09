import React, {useEffect, useCallback, useState} from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
import { useAppContext } from '@/context/useContextProvider';
import Link from 'next/link';
import { options } from './options';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function Analytics() {

    const [postDataSet, setPostDataSet] = useState([])
    const [error, setError] = useState('')
    const {currentUser} = useAppContext()
    const [readerCount, setReadersCount ] = useState([])
    const [likeCount, setLikeCount ] = useState([])
    const [commentsCount, setCommentsCount] = useState([])
    const [totalReadCount, setTotalReadCount] = useState(0)
    const [retryFetch, setRetryFetch] = useState(false)

    const fetchAnalyticsData = useCallback( async () => {
        
        try {
            
            const response = await fetch(`http://localhost:3001/blogRoutes/analytics_data`, 
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const json = await response.json()
            
            console.log(json, )
            
            if (json.message === "success" && ! json.zero) {
                
                setPostDataSet(json.data)
                setCommentsCount(json.commentCount)
                setReadersCount(json.readerCount)
                setLikeCount(json.likeCount)
                setTotalReadCount(json.readerCount.reduce((a, b) => a + b.viewCount, 0))
            }

            else if (json.zero) setPostDataSet("zero")

            else if (json.status === "failed") setError(true)

        } 
        
        catch ( e ) {
            console.error(e, 'analytics')
            setError(true)
            setPostDataSet(undefined)
        }
    }, [retryFetch])
    
    useEffect( () => {
        fetchAnalyticsData()
    }, [fetchAnalyticsData, retryFetch])

    // let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    if (! postDataSet?.length && postDataSet !== "zero") return <div className="flex h-screen items-center justify-center mx-auto right-[50%] mt-[4rem]">
        {
          error ? <div className=" w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
                
                <div className="shadow-white shadow-sm p-2 -translate-y-[30%]  rounded-md  w-screen flex flex-col justify-center items-center mx-auto mb-10 tex-black    ">
                
                    <button 
                        type="button" 
                        className="py-1 h-8 md:h-10 px-4 mt-2 text-lg font-light inline-flex justify-center items-center gap-2 rounded-full bg-gray-800 text-white transition-all hover:bg-gray-900"
                        onClick={() => setRetryFetch(prev => ! prev)}   
                    >
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            className='w-7 h-7'
                            >
                            <path d="M256 48C141.31 48 48 141.32 48 256c0 114.86 93.14 208 208 208 114.69 0 208-93.31 208-208 0-114.87-93.13-208-208-208zm94 219a94 94 0 11-94-94h4.21l-24-24L256 129.2l59.8 59.8-59.8 59.8-19.8-19.8 27.92-27.92c-2.4-.08-5.12-.08-8.12-.08a66 66 0 1066 66v-14h28z" />
                        </svg>
                        Retry
                    </button>
                </div>
            </div>
          : <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-2 h-7 w-7"></div>
        }
    </div>

    else if (postDataSet === "zero") {
        
        return (
            
            <div className="flex h-screen items-center justify-center mx-auto right-[50%] mt-[4rem]">
                <div className="w-screen flex items-center justify-center flex-col text-center  mt-20 mx-auto text-4xl font-semibold mb-10 text-black ">
                    <p className="text-2xl"> You have not created any posts yet. </p>
                    <p className="text-2xl"> Create a new post to get started. </p>
                </div>
            </div>
        )
    }

    const commentCountByDate = commentsCount.reduce((acc, comment) => {

        const date = comment.commentedOn.split('T')[0];
        acc[date] = (acc[date] || 0) + 1; // Increment comment count for each date
        return acc;

    }, {});

    const readerCountByDate = postDataSet.reduce((acc, reader) => {
        const date = reader.viewdAt.split('T')[0];
        acc[date] = (acc[date] || 0) + 1; // Increment reader count for each date
        return acc;
    }, {});
    
    const likesCountByDate = likeCount.reduce((acc, reader) => {
        const date = reader.likedAt.split('T')[0];
        acc[date] = (acc[date] || 0) + 1; // Increment reader count for each date
        return acc;
    }, {});

    return (
        <div className=" h-1/2 flex flex-col">
            
            <Link href={"/my_account"} className="mt-10 border-none outline-none   hover:text-gray-900 w-fit px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-white"> Back to profile</Link>
            
            <h1 className="md:text-5xl text-2xl text-black font-bold mt-10 tracking-wide"> Analytics for {currentUser ? currentUser?.username : null }</h1>
            
            <div className="w-full justify-center items-center md:justify-between mt-20 flex md:flex-row flex-col gap-y-4 gap-x-2">

                <div className="p-10 w-1/2 bg-gray-100 rounded-md text-center flex items-center justify-center flex-col">
                   <p> Readers </p>
                   <p className="mt-3 font-bold bg-white px-2 rounded-full w-fit text-2xl"> {totalReadCount}</p>

                </div>

                <div className="p-10 w-1/2 bg-gray-100 rounded-md text-center flex items-center justify-center flex-col">
                    <p>   Reactions </p>
                    <p className="mt-3 font-bold bg-white px-2 rounded-full w-fit text-2xl"> {likeCount.length }</p>
                </div>

                <div className="p-10 w-1/2 bg-gray-100 rounded-md text-center flex items-center justify-center flex-col">
                    Comments
                    <p className="mt-3 font-bold bg-white px-2 rounded-full w-fit text-2xl"> {commentsCount.length }</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-md mt-5">
                
                <h1 className="md:text-3xl text-xl text-black font-bold mt-10 tracking-wide mb-2 ml-4"> Readers Summary</h1>
                
                <hr />
                
                <Line
                    datasetIdKey='readers'
                    data={{
                    
                        labels : Object.keys(readerCountByDate).sort( (a, b) => new Date(a) - new Date(b)),
                    
                        datasets: [
                            {
                                label: 'Reads',
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgb(255, 99, 132)',
                                data: Object.values(readerCountByDate).reverse()
                            },
                        ],
                    }}
                    height={40}
                    width={100}
                    options={options}
                />
            </div>
            
            <div className="flex md:flex-row flex-col items-center justify-between gap-x-2">

                <div className="bg-gray-50 rounded-md mt-5 md:w-1/2 w-full">
                    
                    <h1 className="md:text-3xl text-xl text-black font-bold mt-10 tracking-wide mb-2 ml-4"> Comments Summary</h1>
                    
                    <hr />
                    
                    <Line
                        
                        datasetIdKey='comments'
                        
                        data={{
                        
                            labels : Object.keys(commentCountByDate).sort( (a, b) => new Date(a) - new Date(b)),
                        
                            datasets: [
                                {
                                    label: 'Comments',
                                    fill: false,
                                    backgroundColor: '#008B8B',
                                    borderColor: 'rgb(255, 99, 132)',
                                    data: Object.values(commentCountByDate)
                                },
                            ],
                        }}
                        height={40}
                        width={100}
                        options={options}
                    />
                </div>

                <div className="bg-gray-50 rounded-md mt-5 md:w-1/2 w-full">
                    
                    <h1 className="md:text-3xl text-xl text-black font-bold mt-10 tracking-wide mb-2 ml-4"> Reaction Summary</h1>
                    
                    <hr />
                    
                    <Line
                        datasetIdKey='reactions'
                        data={{
                        
                            labels : Object.keys(likesCountByDate).sort( (a, b) => new Date(a) - new Date(b)),
                        
                            datasets: [
                                {
                                    label: 'Reactions',
                                    fill: false,
                                    backgroundColor: '#8A2BE2',
                                    borderColor: 'rgb(255, 99, 132)',
                                    data: Object.values(likesCountByDate)
                                },
                            ],
                        }}
                        height={40}
                        width={100}
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}
