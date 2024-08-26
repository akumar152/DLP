import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';

const data = [
    {
        id: "Malaysia",
        data: [
            { x: "Critical", y: 50 },
            { x: "Pending", y: 80 },
            { x: "In-Progress", y: 90 },
            { x: "Not Started", y: 70 },
        ]
    },
    {
        id: "Indonesia",
        data: [
            { x: "Critical", y: 25 },
            { x: "Pending", y: 80 },
            { x: "In-Progress", y: 60 },
            { x: "Not Started", y: 20 },
        ]
    },
    {
        id: "Hong Kong",
        data: [
            { x: "Critical", y: 30 },
            { x: "Pending", y: 10 },
            { x: "In-Progress", y: 50 },
            { x: "Not Started", y: 45 },
        ]
    },
    {
        id: "Philippines",
        data: [
            { x: "Critical", y: 90 },
            { x: "Pending", y: 80 },
            { x: "In-Progress", y: 100 },
            { x: "Not Started", y: 70 },
        ]
    },
];

const Heatmap = () => (
    <div className="heatmap-container">
        <ResponsiveHeatMap
            data={data}
            keys={['Critical', 'Pending', 'In-Progress', 'Not Started']}
            indexBy="id"
            margin={{ top: 60, right: 40, bottom: 80, left: 100 }}
            colors={{ type: 'sequential', scheme: 'blues' }}
            axisTop={{
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            }}
            axisRight={null}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: -60,
            }}
            cellOpacity={1}
            cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            hoverTarget="cell"
            cellHoverOthersOpacity={0.25}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateX: 0,
                    translateY: 50,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemsSpacing: 0,
                    symbolSize: 20,
                    legendPosition: 'middle',
                    legendOffset: 0,
                    color: {
                        type: 'sequential',
                        scheme: 'blues',
                    }
                }
            ]}
        />
    </div>
);

export default Heatmap;
