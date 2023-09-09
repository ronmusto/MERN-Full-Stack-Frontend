import React, { useState } from 'react';
import { useTable } from 'react-table';
import styles from '../CSS/AI.module.css';
import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';
import PredictionForm from '../AIcomponents/predictionForm';
import PredictionResult from '../AIcomponents/predictionResult';
import TableDisplay from '../AIcomponents/AITableDisplay';
import FeatureImportancesChart from '../AIcomponents/featureChart';


Chart.register(BarController, LinearScale, CategoryScale, BarElement);

const AI = () => {
  const [prediction, setPrediction] = useState('');
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

  const [importances, setImportances] = useState([]);

  // ADD THIS NEW STATE VARIABLE
  const [chartkey, setKey] = useState(0);

  const expectedFeatures = ['medInc', 'houseAge', 'aveRooms', 'aveBedrms',
   'population', 'aveOccup', 'latitude', 'longitude'];

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
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
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

  // Sort the features by their importances
  const chartData = {
    labels: expectedFeatures,
    datasets: [
      {
        label: 'Feature Importances',
        data: importances,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Feature',
        accessor: 'feature', // accessor is the "key" in the data
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    []
  );

  const tableData = React.useMemo(
    () => expectedFeatures.map((feature, index) => ({
      feature,
      value: inputs[feature]
    })),
    [inputs]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <div className={styles.aiContainer}>
        <PredictionForm 
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
        
        <PredictionResult prediction={prediction} />

        <FeatureImportancesChart 
            chartData={chartData}
            options={options}
            key={chartkey}
        />

        <TableDisplay 
            getTableProps={getTableProps}
            headerGroups={headerGroups}
            getTableBodyProps={getTableBodyProps}
            rows={rows}
            prepareRow={prepareRow}
        />
    </div>
  ); 
};

export default AI;