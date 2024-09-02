import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip'
import countries from './countries-50m.json';
import 'react-tooltip/dist/react-tooltip.css'

const markers = [
    { markerOffset: -15, name: "India", coordinates: [78.9629, 20.5937] },
    { markerOffset: -15, name: "Malaysia", coordinates: [101.9758, 4.2105] },
    { markerOffset: -15, name: "Philippines", coordinates: [122.5597, 13.4125] },
    { markerOffset: -15, name: "Indonesia", coordinates: [113.9213, -0.7893] },
    { markerOffset: -15, name: "Hong Kong", coordinates: [114.1095, 22.3964] }
];

const marketColors = {
    'Priority Market': 'purple',
    'Emerging Market': 'red',
    'Exploratory Market': 'orange'
};

// Define country market categories
const countryData = {
    "India":"Emerging Market",
    'Malaysia': 'Priority Market',
    'Indonesia': 'Exploratory Market',
    'Philippines': 'Exploratory Market',
    'Hong Kong': 'Priority Market'
};

const MapNew = () => {
    const [content, setContent] = useState("");
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* <h1>{content}</h1> */}
            <Tooltip
                id="my-tooltip"
                content={`${content}`}
                // events={['hover']}
            />
            <div style={{
                width: '100%',
                borderStyle: 'double',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ComposableMap>
                    <ZoomableGroup zoom={1}>
                        {/* {" "} */}
                        <Geographies geography={countries}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        data-tooltip-id="my-tooltip"
                                        data-tip={geo.properties.name} // Set data-tip here
                                        onMouseEnter={() => setContent(`${geo.properties.name}`)}
                                        onMouseLeave={() => setContent("")}
                                        style={{
                                            default: {
                                                fill: "#D6D6DA",
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: "#F53",
                                                outline: "none"
                                            },
                                            pressed: {
                                                fill: "#E42",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                        {markers.map(({ name, coordinates, markerOffset }) => (
                         
                            <Marker key={name} coordinates={coordinates}>
                                <circle r={10} fill={marketColors[countryData[name]]} stroke="#fff" strokeWidth={2} />
                                <text
                                    textAnchor="middle"
                                    y={markerOffset}
                                    style={{
                                        fontFamily: "system-ui",
                                        fill: "#5D5A6D"
                                    }}
                                >
                                    {name}
                                </text>
                            </Marker>
                        ))}
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </div>
    );
};

export default MapNew;
