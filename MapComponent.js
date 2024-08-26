import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components';

const countryColors = {
    'India': 'lightblue',
    'Indonesia': 'lightgreen',
    'Philippines': 'lightcoral',
    'China': 'lightgoldenrodyellow', // Highlight China including Hong Kong
};

const asiaCountries = ['India', 'Indonesia', 'Philippines', 'China']; // Include China

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-radius: 8px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const MapComponent = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [geoJson, setGeoJson] = useState(null);

    useEffect(() => {
        fetch('https://gist.githubusercontent.com/dhoboy/ff8448ace9d5d567390a/raw/f98a7b12ec0005f72641696752a96d1ccd73ed22/asia.json')
            .then(response => response.json())
            .then(data => setGeoJson(data));
    }, []);

    const handleCountryClick = (geo) => {
        const countryName = geo.properties.name;
        if (asiaCountries.includes(countryName) || countryName === 'Hong Kong') {
            setSelectedCountry(countryName === 'Hong Kong' ? 'China' : countryName);
        }
    };

    const closeModal = () => {
        setSelectedCountry(null);
    };

    if (!geoJson) return <div>Loading...</div>;

    return (
        <div>
            <ComposableMap projection="geoMercator">
                <Geographies geography={geoJson}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const countryName = geo.properties.name;
                            const isHighlighted = asiaCountries.includes(countryName) || countryName === 'Hong Kong';

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => handleCountryClick(geo)}
                                    style={{
                                        default: {
                                            fill: isHighlighted ? countryColors[countryName === 'Hong Kong' ? 'China' : countryName] : '#D6D6DA',
                                            outline: 'none',
                                        },
                                        hover: {
                                            fill: isHighlighted ? countryColors[countryName === 'Hong Kong' ? 'China' : countryName] : '#F53',
                                            outline: 'none',
                                        },
                                        pressed: {
                                            fill: isHighlighted ? countryColors[countryName === 'Hong Kong' ? 'China' : countryName] : '#E42',
                                            outline: 'none',
                                        },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

            {selectedCountry && (
                <>
                    <Overlay onClick={closeModal} />
                    <Modal>
                        <h2>{selectedCountry}</h2>
                        <p>Number of Issues: 45</p>
                        <p>Total Cost: $2000</p>
                        <button onClick={closeModal}>Close</button>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default MapComponent;
