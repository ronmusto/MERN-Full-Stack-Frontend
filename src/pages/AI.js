import React, { useState } from 'react';
import styles from '../CSS/AI.module.css';
import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';
import PredictionForm from '../AIcomponents/predictionForm';
import PredictionResult from '../AIcomponents/predictionResult';
import FeatureImportancesChart from '../AIcomponents/featureChart';
import CaliforniaMap from '../AIcomponents/caliMap';

Chart.register(BarController, LinearScale, CategoryScale, BarElement);

const AI = () => {
  const [prediction, setPrediction] = useState('');
  const [importances, setImportances] = useState([]);
  const [chartkey, setKey] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 34,
    lng: -118
  });

  const [inputs, setInputs] = useState({
    medInc: '2.5',
    houseAge: '35',
    aveRooms: '5',
    aveBedrms: '1',
    population: '1000',
    aveOccup: '3',
    latitude: '34',
    longitude: '-118'
  });

  const expectedFeatures = ['medInc', 'houseAge', 'aveRooms', 'aveBedrms',
   'population', 'aveOccup', 'latitude', 'longitude'];

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
  // Extract latitude and longitude from selectedLocation
  let { lat, lng } = selectedLocation;

  // Round and convert to string
  lat = Math.round(lat).toString();
  lng = Math.round(lng).toString();

  // Create a modified inputs array with the updated lat and lng values
  const modifiedInputs = [
      ...Object.values(inputs).slice(0, 6), // First 6 values remain unchanged
      lat, // Replace 7th value with updated latitude
      lng  // Replace 8th value with updated longitude
  ];
  
    fetch('http://localhost:4200/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: Object.values(modifiedInputs) })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(modifiedInputs);
      })
      .then(data => {
        // Format the prediction into a dollar amount
        const predictedPrice = (data.prediction * 100000).toFixed(2);
        // Convert the price to a string and add commas as thousands separators
        const formattedPrice = Number(predictedPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        setPrediction(`Predicted Price: ${formattedPrice}`);
        setImportances(data.importances);
        
        // Increment the key here
        setKey(prevKey => prevKey + 1);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const getGradientColors = (importances) => {
    const maxImportance = Math.max(...importances);
    return importances.map((imp) => {
      const intensity = Math.floor(255 * imp / maxImportance);
      return `rgb(${255 - intensity}, ${intensity}, 192)`;
    });
  };
  
  const chartColors = getGradientColors(importances);

  // Sort the features by their importances
  const chartData = {
    labels: expectedFeatures,
    datasets: [
      {
        label: 'Feature Importances',
        data: importances,
        backgroundColor: chartColors
      },
    ]
  };

  chartData.labels.sort((a, b) => chartData.datasets[0].data[expectedFeatures.indexOf(b)] - chartData.datasets[0].data[expectedFeatures.indexOf(a)]);
  chartData.datasets[0].data.sort((a, b) => b - a);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.aiContainer}>
        <PredictionForm 
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />

        <CaliforniaMap setSelectedLocation={setSelectedLocation}/>
        
        <PredictionResult prediction={prediction} />

        <FeatureImportancesChart 
            chartData={chartData}
            options={options}
            key={chartkey}
        />


    </div> 
  ); 
};

export default AI;
