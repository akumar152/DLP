// src/AsiaMap.js
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import asiaGeoJSON from './custom.geo.json'; // Replace with your GeoJSON path
import './AsiaMap.css';

// Define colors for each market category
const marketColors = {
    'Priority Market': 'purple',
    'Emerging Market': 'red',
    'Exploratory Market': 'orange'
};

// Define country market categories
const countryData = {
    'India': 'Emerging Market',
    'Malaysia': 'Priority Market',
    'Indonesia': 'Exploratory Market',
    'Philippines': 'Exploratory Market',
    'Hong Kong': 'Priority Market'
};

const AsiaMap = () => {
    const svgRef = useRef(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

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
            .attr('fill', d => {
                const countryName = d.properties.name;
                const marketCategory = countryData[countryName];
                return marketCategory ? marketColors[marketCategory] : '#ccc';
            })
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5);

        // Position buttons
        const buttonContainer = d3.select('#button-container');
        buttonContainer.selectAll('button')
            .data(asiaGeoJSON.features)
            .enter().append('button')
            .attr('class', 'country-button')
            .style('position', 'absolute')
            .style('background-color', d => {
                const countryName = d.properties.name;
                const marketCategory = countryData[countryName];
                return marketCategory ? marketColors[marketCategory] : '#ccc';
            })
            .style('color', '#fff')
            .style('border', 'none')
            .style('border-radius', '5px')
            .style('padding', '5px')
            .style('font-size', '10px')
            .style('cursor', 'pointer')
            .text(d => d.properties.name)
            .on('click', (event, d) => {
                const countryName = d.properties.name;
                setModalContent({
                    countryName,
                    numberOfIssues: Math.floor(Math.random() * 100), // Dummy data
                    totalCost: (Math.random() * 10000).toFixed(2) // Dummy data
                });
                setModalOpen(true);
            })
            .each(function (d) {
                const [longitude, latitude] = d.geometry.coordinates[0][0];
                const [x, y] = projection([longitude, latitude]);
                d3.select(this)
                    .style('left', `${x}px`)
                    .style('top', `${y}px`)
                    .style('transform', 'translate(-50%, -50%)'); // Center button
            });

    }, []);

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
            <div id="button-container" style={{ position: 'relative', width: '100%', height: '100%' }}></div>
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
        </div>
    );
};

export default AsiaMap;
