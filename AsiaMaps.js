import React, { useState } from 'react';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import { asiaMill } from "@react-jvectormap/asia";
import './AsiaMaps.css';

const asiaCountries = {
    MY: 'lightblue', // Malaysia
    ID: 'lightgreen', // Indonesia
    PH: 'lightcoral', // Philippines
    CN: 'lightgoldenrodyellow' // Hong Kong
};

const countriesData = {
    MY: { countryName: 'Malaysia', issues: 45, cost: 2000 },
    ID: { countryName: 'Indonesia', issues: 60, cost: 3400 },
    PH: { countryName: 'Philippines', issues: 30, cost: 1500 },
    CN: { countryName: 'Hong Kong', issues: 25, cost: 1800 }
};

const AsiaMaps = () => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleRegionClick = (e, code) => {
        if (countriesData[code]) {
            setModalContent(countriesData[code]);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <VectorMap
                map={asiaMill}
                backgroundColor="transparent"
                regionStyle={{
                    initial: {
                        fill: '#E4E4E4',
                        "fill-opacity": 1,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 1
                    },
                    hover: {
                        "fill-opacity": 0.8,
                        cursor: 'pointer'
                    }
                }}
                series={{
                    regions: [
                        {
                            values: asiaCountries,
                            attribute: 'fill'
                        }
                    ]
                }}
                regionsSelectable={false}
                containerStyle={{
                    width: '100%',
                    height: '100%'
                }}
                containerClassName="map"
                zoomOnScroll={false}
                focusOn={{
                    x: 1,
                    y: 2,
                    scale: 2 // Adjust this value to focus on Asia
                }}
                onRegionClick={handleRegionClick}
            />

            {isModalOpen && modalContent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{modalContent.countryName}</h2>
                        <p>Number of Issues: {modalContent.issues}</p>
                        <p>Total Cost: ${modalContent.cost}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AsiaMaps;
