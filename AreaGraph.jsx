import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineGraph = ({ data = [] }) => {
    // Ensure data is an array and has the correct structure
    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }

    // Find the maximum value in the data and add a gap of 50
    const maxY = Math.max(
        ...data.flatMap(series => series.data.map(point => point.y))
    );
    const yMaxWithGap = maxY + 50;

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: yMaxWithGap, stacked: false, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Market',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Cost ($)',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                colors={{ scheme: 'nivo' }}
                lineWidth={2}
                enablePointLabel={true}
                pointSize={10}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableSlices='x'
                sliceTooltip={({ slice }) => (
                    <div style={{ padding: '12px', background: '#fff', border: '1px solid #ddd' }}>
                        {slice.points.map(point => (
                            <div key={point.id}>
                                <strong>{point.data.x}</strong>: {point.data.yFormatted} $
                            </div>
                        ))}
                    </div>
                )}
                tooltip={({ point }) => (
                    <div style={{ padding: '12px', background: '#fff', border: '1px solid #ddd' }}>
                        <strong>{point.data.x}</strong>: {point.data.yFormatted} $
                    </div>
                )}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fontSize: 12,
                                fontWeight: 'bold',
                                fill: '#333' // Change to desired color
                            }
                        },
                        legends: {
                            text: {
                                fontSize: 14,
                                fontWeight: 'bold',
                                fill: '#333' // Change to desired color
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default LineGraph;
