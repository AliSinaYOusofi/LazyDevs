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


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
};
export default function Analytics() {

    const [postDataSet, setPostDataSet] = useState([])
    const [error, setError] = useState('')

    const fetchData = useCallback( async () => {
        
        try {
            
            const response = await fetch(`http://localhost:3001/blogRoutes/analytics_data`, 
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const json = await response.json()
            
            if (json.status === "success") setPostDataSet(json.data)
            
            if (json.message === "success" && ! json.zero) {
                setPostDataSet(json.data)
                console.log(json.data, 'setting data')
            }

            else if (json.zero) setPosts("zero")

            else if (json.status === "failed") setError(true)
        } 
        
        catch ( e ) {
            console.error(e, 'analytics')
            setError(true)
            setPostDataSet(undefined)
        }
    }, [])


    useEffect( () => {
        fetchData()
    }, [])

    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    

    return (
        <div className=" h-2/3 flex items-center justify-center">
            
            <Line
                
                data={{
                
                    labels: postDataSet.length >= 1 
                    ? postDataSet.map(post => {
                        const index = labels.findIndex(label => label === post.nameOfTheMonth);
                        return labels.slice(index);
                    })
                    : labels,
                
                    datasets: [
                        {
                            label: 'Posts',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: postDataSet ? [postDataSet.length] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
                        },
                    ],
                }}
                height={100}
                width={100}
                options={options}
            />
        </div>
    )
}
