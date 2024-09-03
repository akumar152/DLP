import React, { useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import useDimensions from './useDimensions';

const data = [
    {
        country: 'Malaysia',
        active: 130,
        inactive: 50,
    },
    {
        country: 'Indonesia',
        active: 500,
        inactive: 80,
    },
    {
        country: 'Hong Kong',
        active: 150,
        inactive: 60,
    },
    {
        country: 'Philippines',
        active: 90,
        inactive: 40,
    },
];

const GroupedBarChart = () => {
    const containerRef = useRef(null);
    const { width, height } = useDimensions(containerRef);

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
            {width > 0 && height > 0 && (
                <ResponsiveBar
                    data={data}
                    keys={['active', 'inactive']}
                    indexBy="country"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    groupMode="grouped"
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Country',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Cost (in dollars)',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    tooltip={({ id, value, color }) => (
                        <div
                            style={{
                                padding: '12px',
                                color: '#fff',
                                background: color,
                            }}
                        >
                            <strong>
                                {id}: ${value}
                            </strong>
                        </div>
                    )}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart"
                    barAriaLabel={function (e) {
                        return `${e.id}: ${e.value} in country: ${e.indexValue}`;
                    }}
                />
            )}
        </div>
    );
};

export default GroupedBarChart;
