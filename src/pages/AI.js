import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTable } from 'react-table';
import './AI.module.css';
import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';

Chart.register(BarController, LinearScale, CategoryScale, BarElement);

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

  const [importances, setImportances] = useState([]);

  const expectedFeatures = ['medInc', 'houseAge', 'aveRooms', 'aveBedrms', 'population', 'aveOccup', 'latitude', 'longitude'];

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
        setPrediction(`Prediction: ${data.prediction}`);
        setImportances(data.importances);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const data = {
    labels: expectedFeatures,
    datasets: [
      {
        label: 'Feature Importances',
        data: importances,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };
  
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
  )

  const tableData = React.useMemo(
    () => expectedFeatures.map((feature, index) => ({
      feature,
      value: inputs[feature]
    })),
    [inputs]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData })

  return (
    <div>
      <h1>My Prediction Form</h1>
      <form id="predict-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>Median Income (0 to 10):</h3>
          <label htmlFor="medInc">Median Income:</label>
          <br />
          <input type="number" id="medInc" name="medInc" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <h3>House Age (0 to 50):</h3>
          <label htmlFor="houseAge">House Age:</label>
          <br />
          <input type="number" id="houseAge" name="houseAge" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <h3>Average Rooms (0 to 10):</h3>
          <label htmlFor="aveRooms">Average Rooms:</label>
          <br />
          <input type="number" id="aveRooms" name="aveRooms" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <h3>Average Bedrooms (0 to 5):</h3>
          <label htmlFor="aveBedrms">Average Bedrooms:</label>
          <br />
          <input type="number" id="aveBedrms" name="aveBedrms" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <h3>Population (0 to 5000):</h3>
          <label htmlFor="population">Population:</label>
          <br />
          <input type="number" id="population" name="population" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <h3>Average Occupancy (0 to 10):</h3>
          <label htmlFor="aveOccup">Average Occupancy:</label>
          <br />
          <input type="number" id="aveOccup" name="aveOccup" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <h3>Latitude (33 to 42):</h3>
          <label htmlFor="latitude">Latitude:</label>
          <br />
          <input type="number" id="latitude" name="latitude" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <h3>Longitude (-124 to -114):</h3>
          <label htmlFor="longitude">Longitude:</label>
          <br />
          <input type="number" id="longitude" name="longitude" onChange={handleChange} />
          <br />
        </div>
        <div className="form-group">
          <button type="submit">Predict</button>
        </div>
      </form>
      <div id="prediction">{prediction}</div>
      <div>
      <Bar data={data} options={options} />
      </div>
      <div>
        <table {...getTableProps()} style={{ margin: 'auto' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AI;
