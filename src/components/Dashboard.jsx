import React, { useEffect } from 'react';
import './Dashboard.css'
import DashPie from './Dashpie';
import DashCalender from './DashCal';
import DashVol from './DashVol';

export default function Dashboard({user}) {
    const [catData, setCatData] = React.useState([])
    const [simBalance, setSimBalance] = React.useState([])
    console.log("file: Dashboard.jsx:9 -> Dashboard -> simBalance:", simBalance);
    // {id: 1, username: 'test1', balance: 33000, sub: 'premium'}

    useEffect(() => {
        fetch(`https://pockets.onrender.com/uCardBal/${user}`)
        .then(res => res.json())
        .then(data => {
            setSimBalance([data,'Sim'])
        })
        .catch(err => console.log(err))    
    },[])


    return (
        <div id='eDashboard'>
            <div id='eHeader'>
                <div id='eLogo'></div>
                <div id='eRoutes'></div>
                <div id='eProfile'></div>
            </div>

            {/* Dashboard main content */}
            <div id='eMain'>
                <div id='eSidebar'></div>

                <div id='eContent'>
                    <div id='ePie'>
                        <div className="eCategory" id="eGreet">
                            <div className='eCatGreet'>
                                <h1 className='eGTxt'>Welcome {simBalance[0][0].username}...</h1>
                                <h2 className='eGTxt'>{simBalance[1]} Balance: $ {simBalance[0][0].balance}</h2>
                                <p className='eGTxt'>Tier: {simBalance[0][0].sub}</p>
                            </div>
                            <div className='eCatGreet'>
                                
                            </div>
                        </div>
                        <DashPie setCatData={setCatData} userId={user}/>
                    </div>
                    <div id='eContentBtm'>
                        <DashCalender data={catData} userId={user}/>
                        <DashVol/>
                    </div>
                </div>
            </div>
        </div>
    );
}