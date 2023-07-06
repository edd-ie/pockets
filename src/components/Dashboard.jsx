import React, { useEffect } from 'react';
import './Dashboard.css'
import DashPie from './Dashpie';
import DashCalender from './DashCal';
import DashVol from './DashVol';

export default function Dashboard({user}) {
    const [catData, setCatData] = React.useState([])
    const [simBalance, setSimBalance] = React.useState([])
    const [valTab, setValTab] = React.useState('Sim')
    const [choice, setChoice] = React.useState('sim')

    useEffect(() => {
        fetch(`https://pockets.onrender.com/u${valTab}Bal/${user}`)
        .then(res => res.json())
        .then(data => {
            console.log("file: Dashboard.jsx:17 -> useEffect -> data:", data);
            setSimBalance(data)
        })
        .catch(err => console.log(err))    
    },[])

    function handleTab(value){
        setValTab(value)
        fetch(`https://pockets.onrender.com/u${value}Bal/${user}`)
        .then(res => res.json())
        .then(data => {
            console.log("file: Dashboard.jsx:17 -> useEffect -> data:", data);
            setSimBalance(data)
            setChoice(value.toLowerCase())
        })
    }


    return (
        <div id='eDashboard'>
            <div id='eHeader'>
                <div id='eLogo'></div>
                <div id='eRoutes'></div>
                <div id='eProfile'></div>
            </div>

            {/* Dashboard main content */}
            <div id='eMain'>
                <div id='eSidebar'>
                    <div className='eTabs' onClick={() => handleTab('Sim')}>
                        <span className="material-symbols-sharp eIconsTab">
                        sim_card
                        </span>
                    </div>
                    <div className='eTabs' onClick={() => handleTab('Card')}>
                        <span className="material-symbols-sharp eIconsTab">
                        credit_card
                        </span>
                    </div>
                </div>

                <div id='eContent'>
                    <div id='ePie'>
                        <div className="eCategory" id="eGreet">
                            <div className='eCatGreet'>
                                <h1 className='eGTxt'>Welcome {simBalance.length ==0? 'name':simBalance[0].username}</h1>
                                <h2 className='eGTxt'>{valTab} Balance: $ {simBalance.length ==0? 'name':simBalance[0].balance}</h2>
                                <p className='eGTxt'>Tier: {simBalance.length ==0? 'name':simBalance[0].sub}</p>
                            </div>
                            <div className='eCatGreet'>
                                
                            </div>
                        </div>
                        <DashPie choice={choice} setCatData={setCatData} userId={user}/>
                    </div>
                    <div id='eContentBtm'>
                        <DashCalender choice={valTab} data={catData} userId={user}/>
                        <DashVol choice={choice} userId={user}/>
                    </div>
                </div>
            </div>
        </div>
    );
}