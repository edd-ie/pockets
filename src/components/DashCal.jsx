import React, { useEffect, useState } from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';


export default function DashCalender({data, userId}) {
    const [chartData, setChartData] = useState([]);
    console.log("file: DashCal.jsx:6 -> chartData:", chartData);

    // {id: 1, name: 'telcom', balance: 3000, user_id: 1,
    
    useEffect(() => {
        fetch(`https://pockets.onrender.com/userSims/${userId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let set = []
            let y = 1
            for(let x of data){
                set.push({name: x.name+(y++), balance: x.balance})
            }
            setChartData(set)
        })

    },[])


    return(
        <div className='dashCalender'>
           <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                width={500}
                height={400}
                data={chartData}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
                >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="balance" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="balance" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}