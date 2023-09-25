import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const mapOptions = {
  streetViewControl: false,  // This disables Street View
  mapTypeControl: false      // This disables the map type control (including Satellite view)
};

const TravelMap = ({ vacations }) => {
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [selectedVacation, setSelectedVacation] = useState(null);

  // Calculate the center of all vacation spots for dynamic centering
  const calculateCenter = () => {
    const latitudes = vacations.map(v => v.latitude);
    const longitudes = vacations.map(v => v.longitude);
    return {
      lat: latitudes.reduce((a, b) => a + b, 0) / latitudes.length,
      lng: longitudes.reduce((a, b) => a + b, 0) / longitudes.length
    };
  };

  const handleMarkerClick = (vacation) => {
    setSelectedCoord({ lat: vacation.latitude, lng: vacation.longitude });
    setSelectedVacation(vacation);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAPS_API}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        options={mapOptions}
        center={calculateCenter()} // Dynamic centering
      >
        {vacations.map((vacation, index) => (
          <Marker
            key={index}
            position={{ lat: vacation.latitude, lng: vacation.longitude }}
            onClick={() => handleMarkerClick(vacation)}
          />
        ))}

        {selectedCoord && (
          <InfoWindow
            position={selectedCoord}
            onCloseClick={() => setSelectedCoord(null)}
          >
            <div>
              <h4>{selectedVacation.destination}</h4>
              <p>{selectedVacation.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default TravelMap;
