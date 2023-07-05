import React from 'react';
import './Dashboard.css'
import DashPie from './Dashpie';
import DashCalender from './DashCal';

export default function Dashboard({user}) {
    const [catData, setCatData] = React.useState([])
    console.log("file: Dashboard.jsx:8 -> Dashboard -> catData:", catData);


    return (
        <div id='eDashboard'>
            {/* Dashboard header  
             https://www.youtube.com/watch?v=StGOX_gZeLU
             https://nivo.rocks/pie/
             */}
            <div id='eHeader'>
                <div id='eLogo'></div>
                <div id='eRoutes'></div>
                <div id='eProfile'></div>
            </div>

            {/* Dashboard main content */}
            <div id='eMain'>
                <div id='eSidebar'></div>

                <div id='eContent'>
                    <DashPie setCatData={setCatData} userId={user}/>
                    <div id='eContentBtm'>
                        <DashCalender data={catData} userId={user}/>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}