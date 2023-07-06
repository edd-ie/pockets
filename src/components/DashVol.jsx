import React, { useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashVol({userId}) {
    const [volData, setVolData] = React.useState([]);

    // useEffect(() => {
    //     fetch(`https://pockets.onrender.com/cardUsage/${userId}`)
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //     })
    //     .then(data => {
    //         console.log("file: DashVol.jsx:15 -> useEffect -> data:", data);
            
    //     })
    //     .catch(err => console.log(err));
    

    // },[])

    const data = [
    {
        name: 'Page A',
        uv: 400
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    }
    ];

    return (
        <div id="eDashVol">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 22,
                    left: 0,
                    bottom: 0,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="rgba(0, 240, 0, 0.637)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}