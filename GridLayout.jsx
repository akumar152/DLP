import React from 'react';
import Heatmap from './HeatMap';
import AsiaMap from './AsiaMap';
import AreaGraph from './AreaGraph';
import LineGraph from './AreaGraph';
import MarketTable from './MarketTable';
import './GridLayout.css'; // Import the CSS file

const data = [
    {
        id: 'Countries',
        color: 'hsl(206, 70%, 50%)',
        data: [
            { x: 'Malaysia', y: 100 },
            { x: 'Indonesia', y: 200 },
            { x: 'Hong Kong', y: 300 },
            { x: 'Philippines', y: 150 },
        ],
    },
];

const GridLayout = () => (
    <div className="grid-container">
        {['Market', 'THDM Market Data Matrix', 'Issue', 'Cost'].map((title, index) => (
            <div key={index} className="grid-item">
                <div className="grid-content">
                    {index === 0 && <AsiaMap style={{ width: '100%', height: '100%' }} />}
                    {index === 1 && <MarketTable style={{ width: '100%', height: '100%' }} />}
                    {index === 2 && <Heatmap style={{ width: '100%', height: '100%' }} />}
                    {index === 3 && <LineGraph data={data} style={{ width: '100%', height: '100%' }} />}
                </div>
                <div className="grid-title">
                    {title}
                </div>
            </div>
        ))}
    </div>
);

export default GridLayout;
