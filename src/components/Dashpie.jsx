import React, { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function DashPie({setCatData, userId}) {
    let categories = ['food', 'clothes', 'electronics', 'household', 'other', 'transport', 'health', 'education', 'entertainment']
    const [catTotal, setCatTotal] = useState([])

    useEffect(() => {
        fetch(`https://pockets.onrender.com/simCat/${userId}`)
        .then(res => res.json())
        .then(data => {
            let set = []
            let c = ["hsl(77, 70%, 50%)", "hsl(118, 70%, 50%)", "hsl(182, 70%, 50%)",
            "hsl(324, 70%, 50%)", "hsl(308, 70%, 50%)", "hsl(247, 70%, 50%)", 
            "hsl(329, 70%, 50%)", "hsl(382, 70%, 50%)",
            "hsl(138, 70%, 50%)"
        ]
            for(let x = 0; x <data.length; x++){
                set.push({
                    "id": Object.keys(data[x])[0],
                    "label": Object.keys(data[x])[0],
                    "value": Object.values(data[x])[0],
                    "color": c[x]
                })
            }
            setCatTotal(set)
            setCatData(set)
        })
    },[])


    return(
        <div id='ePie'>
           <div className="eCategory" id=""></div>
           <div className="eCategory" id="eCatTotal">
            <ResponsivePie
                data={catTotal}
                margin={{ top: 40, right: 80, bottom: 30, left: 80 }}
                valueFormat=" >-"
                innerRadius={0.55}
                padAngle={2}
                cornerRadius={8}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'category10' }}
                borderWidth={1}
                borderColor={{ theme: 'background' }}
                arcLinkLabelsTextColor="#ffffff"
                arcLinkLabelsOffset={1}
                arcLinkLabelsDiagonalLength={20}
                arcLinkLabelsStraightLength={28}
                arcLinkLabelsThickness={3}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#000000"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'food'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'clothes'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'electronics'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'household'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'other'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'transport'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'health'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'entertainment'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'left',
                        direction: 'column',
                        justify: false,
                        translateX: -50,
                        translateY: 10,
                        itemsSpacing: 10,
                        itemWidth: 100,
                        itemHeight: 15,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
           </div>
        </div>
    )
}



