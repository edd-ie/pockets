import React from 'react';
import './Dashboard.css'

export default function Dashboard() {


    return (
        <div id='eDashboard'>
            {/* Dashboard header */}
            <div id='eHeader'>
                <div id='eLogo'></div>
                <div id='eRoutes'></div>
                <div id='eProfile'></div>
            </div>

            {/* Dashboard main content */}
            <div id='eMain'>
                <div id='eSidebar'></div>
                <div id='eContent'></div>
            </div>
        </div>
    );
}