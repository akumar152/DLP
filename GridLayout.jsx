import React from 'react';
import Heatmap from './HeatMap';
import AsiaMap from './AsiaMap';
import AreaGraph from './AreaGraph';
import LineGraph from './AreaGraph';
import WorldMap from './Map'; 
import MarketTable from './MarketTable';


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
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
        gridTemplateRows: 'repeat(2, auto)', // 2 rows
        gap: '5px 10px', // Vertical gap: 10px, Horizontal gap: 20px
        width: '100%',
        maxWidth: '1400px',
        height: '600px',
        margin: '0 auto',
        boxSizing: 'border-box', // Ensure padding and border are included in the element’s total width and height
    }}>
        {['Market', 'THDM Market Data Matrix', 'Issue', 'Cost'].map((title, index) => (
            <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                height: '300px',
                boxSizing: 'border-box',
                border: '1px solid #999', // Border width and color
                borderRadius: '8px', // Optional: rounded corners
                overflow: 'hidden', // Ensure content does not overflow the border
            }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    {/* Render different components based on index or title */}
                    {index === 0 && <AsiaMap />}
                    {index === 1 && <MarketTable />}
                    {index === 2 && <Heatmap/>}
                    {index === 3 && <LineGraph data={data} />}
                    {/* Add conditions for other components */}
                </div>
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    {title}
                </div>
            </div>
        ))}
    </div>
);

export default GridLayout;
