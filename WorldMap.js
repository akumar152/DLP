import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import "./WorldMap.css";

const WorldMap = ({ highlightedCountries }) => {
    const mapRef = useRef();
    const [containerDimensions, setContainerDimensions] = useState({ width: 900, height: 600 });

    useEffect(() => {
        const handleResize = () => {
            // Center the SVG within the window
            setContainerDimensions({
                width: Math.min(window.innerWidth, 900),
                height: Math.min(window.innerHeight, 600)
            });
        };

        window.addEventListener('resize', handleResize);

        // Initial call to set dimensions
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const { width, height } = containerDimensions;

        const projection = d3.geoMercator()
            .scale((width / 2) / Math.PI)
            .center([0, 20]) // Adjust center if necessary
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        const svg = d3.select(mapRef.current)
            .attr("width", width)
            .attr("height", height);

        d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((worldData) => {
            const countries = topojson.feature(worldData, worldData.objects.countries).features;

            svg.selectAll(".country")
                .data(countries)
                .enter()
                .append("path")
                .attr("class", (d) => `country ${highlightCountry(d.id)}`)
                .attr("d", path);

            svg.append("path")
                .datum(topojson.mesh(worldData, worldData.objects.countries, (a, b) => a !== b))
                .attr("class", "boundary")
                .attr("d", path);
        });
    }, [highlightedCountries, containerDimensions]);

    const highlightCountry = (id) => {
        const countryMap = {
            356: "india",       // India (ID: 356)
            344: "hong-kong",   // Hong Kong (ID: 344)
            458: "malaysia",    // Malaysia (ID: 458)
            360: "indonesia",   // Indonesia (ID: 360)
            608: "philippines", // Philippines (ID: 608)
            // Add more countries if needed
        };

        return highlightedCountries.includes(countryMap[id]) ? "highlighted" : "";
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg ref={mapRef} style={{ maxWidth: '100%', maxHeight: '100%' }}></svg>
        </div>
    );
};

export default WorldMap;
