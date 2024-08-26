// src/GeoMap.js

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './GeoMap.css';

const GeoMap = () => {
    const svgRef = useRef();
    const [tooltip, setTooltip] = useState(null);

    useEffect(() => {
        // Define static array inside useEffect
        const highlightedCountries = ['HongKong', 'Malaysia', 'Indonesia', 'Philippines'];

        // Define dimensions
        const width = 960;
        const height = 600;

        // Create an SVG container
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // Define a projection and path generator
        const projection = d3.geoMercator().scale(150).translate([width / 2, height / 2]);
        const path = d3.geoPath().projection(projection);

        // URL to the local GeoJSON file
        const geojsonUrl = '/custom.geo.json'; // Adjust this path as necessary

        // Load and process GeoJSON data
        fetch(geojsonUrl)
            .then(response => response.json())
            .then(geojson => {
                // Log the GeoJSON data
                console.log('GeoJSON Data:', geojson);

                // Render map
                svg.selectAll('.country')
                    .data(geojson.features)
                    .enter().append('path')
                    .attr('class', 'country')
                    .attr('d', path)
                    .attr('fill', d => highlightedCountries.includes(d.properties.name) ? 'blue' : '#ccc')
                    .attr('stroke', '#333')
                    .on('click', (event, d) => setTooltip(d.properties.name));

                // Add country labels
                svg.selectAll('.label')
                    .data(geojson.features)
                    .enter().append('text')
                    .attr('class', 'label')
                    .attr('x', d => path.centroid(d)[0])
                    .attr('y', d => path.centroid(d)[1])
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#000')
                    .text(d => highlightedCountries.includes(d.properties.name) ? d.properties.name : '');
            })
            .catch(error => {
                console.error('Error loading the GeoJSON file:', error);
            });

    }, []); // Empty dependency array ensures effect runs once

    return (
        <div className="geo-map-container">
            <svg ref={svgRef}></svg>
            {tooltip && (
                <div className="tooltip">
                    <p>{tooltip}</p>
                </div>
            )}
        </div>
    );
};

export default GeoMap;
