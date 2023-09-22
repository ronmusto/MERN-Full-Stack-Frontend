import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 36.7783,
  lng: -119.4179
};

const mapOptions = {
    streetViewControl: false  // This disables Street View
};

const CaliforniaMap = ({ setSelectedLocation }) => {
    const [selectedCoord, setSelectedCoord] = useState(null);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedCoord({ lat, lng });
        setSelectedLocation({ lat, lng });
    };

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_MAPS_API}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={6}
                options={mapOptions}
                center={center}
                onClick={handleMapClick}
            >
                {selectedCoord && <Marker position={selectedCoord} />}
            </GoogleMap>
        </LoadScript>
    );
}

export default CaliforniaMap;
