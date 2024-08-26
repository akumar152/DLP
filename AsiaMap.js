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

                    const textWidth = getLegendItemWidth(countryName);
                    g.append('rect')
                        .attr('x', -textWidth / 2 - 5)
                        .attr('y', -20)
                        .attr('width', textWidth + 5)
                        .attr('height', 15) // Adjusted for responsive text
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
                        .attr('x', 1)
                        .attr('y', -12)
                        .attr('text-anchor', 'middle')
                        .style('font-size', '0.7vw') // Responsive font size
                        .text(countryName);
                }
            });

    }, []);

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    // Function to calculate the width of text for legend
    const getLegendItemWidth = (text) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '1vw Arial'; // Adjust font size for responsiveness
        return context.measureText(text).width;
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
            <div className="legend">
                {Object.keys(marketColors).map((market) => (
                    <div key={market} className="legend-item">
                        <div
                            className="legend-color-box"
                            style={{
                                backgroundColor: marketColors[market],
                                width: `${Math.max(getLegendItemWidth(market),50)}px`,
                                height: '5px',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '5px',
                            }}
                        >
                            <span className="legend-text">{market}</span>
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
                        left: hoverInfo.position.x + 10,
                        top: hoverInfo.position.y + 10,
                        maxWidth: '150px', // Added maxWidth to fit within screen
                        whiteSpace: 'nowrap', // Prevent text wrapping
                        overflow: 'hidden', // Hide overflow text
                        textOverflow: 'ellipsis', // Add ellipsis for overflow text
                    }}
                >
                    {hoverInfo.content}
                </div>
            )}
        </div>
    );
};

export default AsiaMap;
