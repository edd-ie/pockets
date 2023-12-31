import React, { useEffect, useState } from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';


export default function DashCalender({data, userId, choice}) {
    const [chartData, setChartData] = useState([]);
    
    
    useEffect(() => {
        fetch(`https://pockets.onrender.com/user${choice}s/${userId}`)
        .then(res => res.json())
        .then(data => {
            
            let set = []
            let y = 1
            for(let x of data){
                set.push({name: x.name+(y++), balance: x.balance})
            }
            setChartData(set)
        })

    },[choice])


    return(
        <div className='dashCalender'>
           <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                width={500}
                height={500}
                data={chartData}
                margin={{
                    top: 30,
                    right: 10,
                    bottom: 10,
                    left: 10,
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