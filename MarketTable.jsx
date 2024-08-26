import React, { useState } from 'react';

const value = {
    'Not Started': 'lightgray',
    'In-progress': 'green',
    'completed': 'blue',
    'Older Modal': 'yellow',
    'Lost Data': 'black'
};

const data = [
    { market: 'India', bronze: 'Not Started', bronzeTarget: 'In-progress', silver: 'completed', silverTarget: 'Older Modal', gold: 'Lost Data', goldTarget: 'Not Started' },
    { market: 'Indonesia', bronze: 'In-progress', bronzeTarget: 'completed', silver: 'Older Modal', silverTarget: 'Lost Data', gold: 'Not Started', goldTarget: 'In-progress' },
    { market: 'Hong Kong', bronze: 'completed', bronzeTarget: 'Older Modal', silver: 'Lost Data', silverTarget: 'Not Started', gold: 'In-progress', goldTarget: 'completed' },
    { market: 'Malaysia', bronze: 'Older Modal', bronzeTarget: 'Lost Data', silver: 'Not Started', silverTarget: 'In-progress', gold: 'completed', goldTarget: 'Older Modal' },
    { market: 'Philippines', bronze: 'Lost Data', bronzeTarget: 'Not Started', silver: 'In-progress', silverTarget: 'completed', gold: 'Older Modal', goldTarget: 'Lost Data' }
];

const MarketTable = () => {
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

    const showTooltip = (content, event) => {
        setTooltip({
            visible: true,
            content: content,
            x: event.clientX,
            y: event.clientY
        });
    };

    const hideTooltip = () => {
        setTooltip({ visible: false, content: '', x: 0, y: 0 });
    };

    return (
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '20px' }}>
            <table border="1" style={{ width: '100%', height: '80%', textAlign: 'center', borderCollapse: 'collapse', fontSize: '0.9em', marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'pink', color: 'black', padding: '5px' }}>Market</th>
                        <th style={{ backgroundColor: 'pink', color: 'black', padding: '5px' }}>Bronze</th>
                        <th style={{ backgroundColor: 'pink', color: 'black', padding: '5px' }}>Bronze (Target)</th>
                        <th style={{ backgroundColor: 'pink', color: 'black', padding: '5px' }}>Silver</th>
                        <th style={{ backgroundColor: 'pink', color: 'black', padding: '5px' }}>Silver (Target)</th>
                        <th style={{ backgroundColor: 'pink', color: 'black', padding: '5px' }}>Gold</th>
                        <th style={{ backgroundColor: 'pink', color: 'black', padding: '5px' }}>Gold (Target)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td
                                style={{
                                    backgroundColor: index % 2 === 0 ? 'lightpink' : 'pink',
                                    color: 'black',
                                    padding: '5px'
                                }}
                            >
                                {row.market}
                            </td>
                            <td
                                style={{ backgroundColor: value[row.bronze], padding: '5px' }}
                                onMouseEnter={(e) => showTooltip(row.bronze, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                style={{ backgroundColor: value[row.bronzeTarget], padding: '5px' }}
                                onMouseEnter={(e) => showTooltip(row.bronzeTarget, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                style={{ backgroundColor: value[row.silver], padding: '5px' }}
                                onMouseEnter={(e) => showTooltip(row.silver, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                style={{ backgroundColor: value[row.silverTarget], padding: '5px' }}
                                onMouseEnter={(e) => showTooltip(row.silverTarget, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                style={{ backgroundColor: value[row.gold], padding: '5px' }}
                                onMouseEnter={(e) => showTooltip(row.gold, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                style={{ backgroundColor: value[row.goldTarget], padding: '5px' }}
                                onMouseEnter={(e) => showTooltip(row.goldTarget, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Horizontal Color Legend */}
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', fontSize: '0.8em' }}>
                {Object.keys(value).map((key) => (
                    <div
                        key={key}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '5px'
                        }}
                    >
                        <div
                            style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: value[key],
                                marginRight: '5px',
                                border: '1px solid black'
                            }}
                        ></div>
                        <span>{key}</span>
                    </div>
                ))}
            </div>

            {tooltip.visible && (
                <div
                    style={{
                        position: 'absolute',
                        top: tooltip.y + 10,
                        left: tooltip.x + 10,
                        backgroundColor: 'white',
                        border: '1px solid black',
                        padding: '5px',
                        borderRadius: '5px',
                        zIndex: 1000,
                        pointerEvents: 'none',
                        fontSize: '0.9em'
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </div>
    );
};

export default MarketTable;
