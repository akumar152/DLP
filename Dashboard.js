// src/Dashboard.js
import React from 'react';
import AsiaMap from './AsiaMap'; // Import the AsiaMap component
import './Dashboard.css'; // Import the CSS file for styling
import AsiaMaps from './AsiaMaps';
import MapComponent from './MapComponent';
import Heatmap from './HeatMap';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="section map-section">
                <AsiaMap />
            </div>
            <div className="section graph-section">
                <Heatmap />
                {/* <div className="graph-placeholder">Graph 1</div>
                 */}
            </div>
        </div>
    );
};

export default Dashboard;
