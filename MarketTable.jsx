import React, { useState } from 'react';
import './MarketTable.css'; // Import the updated CSS file

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
        <div className="market-table-container">
            <table className="market-table">
                <thead>
                    <tr>
                        <th className="market-table-header">Market</th>
                        <th className="market-table-header">Bronze</th>
                        <th className="market-table-header">Bronze (Target)</th>
                        <th className="market-table-header">Silver</th>
                        <th className="market-table-header">Silver (Target)</th>
                        <th className="market-table-header">Gold</th>
                        <th className="market-table-header">Gold (Target)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td
                                className={`market-table-cell market-table-cell-market ${index % 2 === 0 ? 'odd' : ''}`}
                            >
                                {row.market}
                            </td>
                            <td
                                className="market-table-cell"
                                style={{ backgroundColor: value[row.bronze] }}
                                onMouseEnter={(e) => showTooltip(row.bronze, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                className="market-table-cell"
                                style={{ backgroundColor: value[row.bronzeTarget] }}
                                onMouseEnter={(e) => showTooltip(row.bronzeTarget, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                className="market-table-cell"
                                style={{ backgroundColor: value[row.silver] }}
                                onMouseEnter={(e) => showTooltip(row.silver, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                className="market-table-cell"
                                style={{ backgroundColor: value[row.silverTarget] }}
                                onMouseEnter={(e) => showTooltip(row.silverTarget, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                className="market-table-cell"
                                style={{ backgroundColor: value[row.gold] }}
                                onMouseEnter={(e) => showTooltip(row.gold, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                            <td
                                className="market-table-cell"
                                style={{ backgroundColor: value[row.goldTarget] }}
                                onMouseEnter={(e) => showTooltip(row.goldTarget, e)}
                                onMouseLeave={hideTooltip}
                            ></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Horizontal Color Legend */}
            <div className="market-table-legend">
                {Object.keys(value).map((key) => (
                    <div
                        key={key}
                        className="market-table-legend-item"
                    >
                        <div
                            className="legend-color-box"
                            style={{ backgroundColor: value[key] }}
                        ></div>
                        <span>{key}</span>
                    </div>
                ))}
            </div>

            {tooltip.visible && (
                <div
                    className="market-table-tooltip"
                    style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
                >
                    {tooltip.content}
                </div>
            )}
        </div>
    );
};

export default MarketTable;
