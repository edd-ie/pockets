import React, { useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashVol({userId, choice}) {
    const [volData, setVolData] = React.useState([]);

    const dataTst = [
        {
            name: 'jun/28',
            amount: 400
        },
        {
            name: 'jun/29',
            amount: 3000
        },
        {
            name: 'jun/30',
            amount: 2000
        },
        {
            name: 'jun/1',
            amount: 2780
        },
        {
            name: 'jun/2',
            amount: 1890
        },
        {
            name: 'jun/3',
            amount: 900,
        },
        {
            name: 'jun/3',
            amount: 1800
        },
        {
            name: 'jun/4',
            amount: 3900
        },
        {
            name: 'jun/5',
            amount: 3000
        }
    ];

    useEffect(() => {
        fetch(`https://pockets.onrender.com/${choice}Usage/${userId}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => {
            let dataset = [];
            for(let x = data.length-1; x >= 0; x--){
                dataset.push({name:data[x]['created_at'], amount:data[x]['amount']});
            }
            setVolData(dataset)
        }
        )
        .catch(err => console.log(err));
    

    },[])

    //{id: 10, category: 'recreation', amount: 1000, card_id: 1, created_at: '04/Jul'}

    

    return (
        <div id="eDashVol">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                width={500}
                height={400}
                data={choice == 'sim' && userId == 1 ? dataTst: volData}
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
                <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="rgba(0, 240, 0, 0.637)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}