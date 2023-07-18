import React, { useState } from 'react';
import './AI.module.css';

const AI = () => {
  const [prediction, setPrediction] = useState('');
  const [inputs, setInputs] = useState({
    medInc: '',
    houseAge: '',
    aveRooms: '',
    aveBedrms: '',
    population: '',
    aveOccup: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: Object.values(inputs) })
    })
      .then(response => response.json())
      .then(data => {
        setPrediction(`Prediction: ${data.prediction}`);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>My Prediction Form</h1>
      <form id="predict-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="medInc">Median Income:</label><br />
          <input type="number" id="medInc" name="medInc" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <label htmlFor="houseAge">House Age:</label><br />
          <input type="number" id="houseAge" name="houseAge" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <label htmlFor="aveRooms">Average Rooms:</label><br />
          <input type="number" id="aveRooms" name="aveRooms" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <label htmlFor="aveBedrms">Average Bedrooms:</label><br />
          <input type="number" id="aveBedrms" name="aveBedrms" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <label htmlFor="population">Population:</label><br />
          <input type="number" id="population" name="population" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <label htmlFor="aveOccup">Average Occupancy:</label><br />
          <input type="number" id="aveOccup" name="aveOccup" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label><br />
          <input type="number" id="latitude" name="latitude" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label><br />
          <input type="number" id="longitude" name="longitude" onChange={handleChange} /><br />
        </div>
        <div className="form-group">
          <button type="submit">Predict</button>
        </div>
      </form>
      <div id="prediction">{prediction}</div>
    </div>
  );
};

export default AI;
