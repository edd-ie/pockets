import React, { useEffect } from 'react';
import './Dashboard.css'
import DashPie from './Dashpie';
import DashCalender from './DashCal';
import DashVol from './DashVol';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard({user, onLogOff, setIsLoggedIn}) {
    const [catData, setCatData] = React.useState([])
    const [simBalance, setSimBalance] = React.useState([])
    const [valTab, setValTab] = React.useState('Sim')
    const [choice, setChoice] = React.useState('sim')

    const navigate = useNavigate()

    const date = new Date().toLocaleDateString('en-US')
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const month = new Date().toLocaleDateString('en-US', { month: 'long' })
    console.log(date, day, month)

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

    function handleLogOff(){
        fetch("https://pockets.onrender.com/logout", {
            method: "DELETE"
        })
        .then(() => {onLogOff([]) 
            setIsLoggedIn(false)
        });
    }

    let [showProf, setShowProf] = React.useState(false)
    function handleProf(){
        setShowProf(!showProf)
    }


    return (
        <div id='eDashboard'>
            <div id='eHeader'>
                <div id='eLogo'>
                    <h1>POC<span>KETS</span></h1>
                </div>
                <div id='eRoutes'>
                    <Link to='/cards'>
                        <div className='eDashRoute'><h2>Cards</h2></div>
                    </Link>
                    <Link to='/sims'>
                        <div className='eDashRoute'><h2>Sims</h2></div>
                    </Link>
                    <Link to='/savings'>
                        <div className='eDashRoute'><h2>Saving</h2></div>
                    </Link>
                </div>
                {!showProf&&<div id='eProfile' onClick={handleProf}></div>}
                
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
                    <div className='eTabLong'>
                        <span className="material-symbols-sharp eIconsTab">
                        calendar_month
                        </span>
                        <div className='eLongDate'>{day}</div>
                        <div className='eLongDate'>{month}</div>
                        <div className='eLongDate'>{date}</div>
                    </div>
                    <div id='eTabTime'>
                        <span className="material-symbols-sharp eIconsTab">
                        schedule
                        </span>
                        <div className='eLongDate'>23:69</div>
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
            {showProf&&(
                    <div id='ePdetails'>
                        <div onClick={handleProf}>{simBalance.length ==0? 'User':simBalance[0].username}</div>
                        <div onClick={()=>{handleProf(); handleLogOff()}}  id='ePLogout'>
                            logout
                        </div>
                    </div>
                )}
        </div>
    );
}