import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import asiaGeoJSON from './custom.geo.json'; // Replace with your GeoJSON path
import './AsiaMap.css';

// Define market colors
const marketColors = {
    'Priority Market': 'purple',
    'Emerging Market': 'red',
    'Exploratory Market': 'orange'
};

// Define country market categories
const countryData = {
    'Malaysia': 'Priority Market',
    'Indonesia': 'Exploratory Market',
    'Philippines': 'Exploratory Market',
    'Hong Kong': 'Priority Market'
};

// Define colors for each country
const colors = {
    Malaysia: 'lightblue',
    Indonesia: 'lightgreen',
    Philippines: 'lightcoral',
    'Hong Kong': 'lightgoldenrodyellow'
};

const AsiaMap = () => {
    const svgRef = useRef(null);
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [hoverInfo, setHoverInfo] = useState({ visible: false, content: '', position: { x: 0, y: 0 } });

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const svgNode = svgRef.current;

        const width = svgNode.clientWidth;
        const height = svgNode.clientHeight;

        const projection = d3.geoMercator()
            .fitSize([width, height], asiaGeoJSON);

        const path = d3.geoPath().projection(projection);

        // Clear previous content
        svg.selectAll('*').remove();

        // Draw the map
        svg.selectAll('path')
            .data(asiaGeoJSON.features)
            .enter().append('path')
            .attr('d', path)
            .attr('fill', d => colors[d.properties.name] || '#ccc')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5);

        // Add tooltips
        svg.selectAll('.tooltip-container')
            .data(asiaGeoJSON.features)
            .enter().append('g')
            .attr('class', 'tooltip-container')
            .each(function (d) {
                const countryName = d.properties.name;
                const marketCategory = countryData[countryName];
                if (marketCategory) {
                    const centroid = path.centroid(d);
                    const g = d3.select(this)
                        .attr('transform', `translate(${centroid[0]}, ${centroid[1] - 20})`);

                    g.append('circle')
                        .attr('cx', 0)
                        .attr('cy', 15)
                        .attr('r', 3)
                        .attr('fill', 'black')
                        .attr('stroke', 'black')
                        .attr('stroke-width', 1);

                    g.append('line')
                        .attr('x1', 0)
                        .attr('y1', 15)
                        .attr('x2', 0)
                        .attr('y2', -15)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 1);

                    const textWidth = countryName.length * 7;
                    g.append('rect')
                        .attr('x', -textWidth / 2 - 5)
                        .attr('y', -20)
                        .attr('width', textWidth + 10)
                        .attr('height', 15)
                        .attr('rx', 10)
                        .attr('ry', 10)
                        .attr('fill', marketColors[marketCategory])
                        .attr('stroke', 'red')
                        .attr('stroke-width', 1)
                        .style('cursor', 'pointer')
                        .on('click', () => {
                            setModalContent({
                                countryName,
                                numberOfIssues: Math.floor(Math.random() * 100),
                                totalCost: (Math.random() * 10000).toFixed(2)
                            });
                            setModalOpen(true);
                        })
                        .on('mouseover', function (event) {
                            const [x, y] = d3.pointer(event);
                            setHoverInfo({
                                visible: true,
                                content: `Additional info for ${countryName}`,
                                position: { x, y }
                            });
                        })
                        .on('mouseout', () => {
                            setHoverInfo({ visible: false, content: '', position: { x: 0, y: 0 } });
                        });

                    g.append('text')
                        .attr('class', 'tooltip-text')
                        .attr('x', 0)
                        .attr('y', -12)
                        .attr('text-anchor', 'middle')
                        .text(countryName);
                }
            });

    }, []);

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    const getLegendItemWidth = (text) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '10px Arial';
        return context.measureText(text).width;
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
            <div className="legend" style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
                {Object.keys(marketColors).map((market) => (
                    <div key={market} className="legend-item">
                        <div
                            className="legend-color-box"
                            style={{
                                backgroundColor: marketColors[market],
                                width: `${Math.max(getLegendItemWidth(market) + 10, 60)}px`,
                                height: '5px',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '5px',
                            }}
                        >
                            <span className="legend-text" style={{ fontSize: '10px', color: 'white' }}>{market}</span>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && modalContent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{modalContent.countryName}</h2>
                        <p>Number of Issues: {modalContent.numberOfIssues}</p>
                        <p>Total Cost: ${modalContent.totalCost}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            {hoverInfo.visible && (
                <div
                    className="additional-tooltip"
                    style={{
                        position: 'absolute',
                        left: hoverInfo.position.x + 100,
                        top: hoverInfo.position.y + 100,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '5px',
                        borderRadius: '5px',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {hoverInfo.content}
                </div>
            )}
        </div>
    );
};

export default AsiaMap;
