import React from 'react';
import './Dashboard.css'
import DashPie from './Dashpie';

export default function Dashboard() {


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
                    <DashPie/>
                </div>
            </div>
        </div>
    );
}