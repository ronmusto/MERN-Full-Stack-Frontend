import React, { useEffect, useState } from 'react';
import './Dashboard.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Dashboard.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Label, Brush, PieChart, 
    Pie, ScatterChart, Scatter, CartesianGrid, Legend, Cell, ResponsiveContainer, Area, AreaChart, 
    Histogram, HeatMap  } from 'recharts';

function Dashboard() {
    const [retailData1, setRetailData1] = useState([]);
    const [retailData2, setRetailData2] = useState([]);
    const [aggregatedData1, setAggregatedData1] = useState([]);
    const [aggregatedData2, setAggregatedData2] = useState([]);
    const [skip, setSkip] = useState(0);
    const [skip2, setSkip2] = useState(0);
    const [xMetric, setXMetric] = useState('Price');
    const [yMetric, setYMetric] = useState('Quantity');
    const [aggregatedXMetric, setAggregatedXMetric] = useState('_id');
    const [aggregatedYMetric, setAggregatedYMetric] = useState('totalQuantity');
    const [processedRetailData1, setProcessedRetailData1] = useState([]);
    const [processedRetailData2, setProcessedRetailData2] = useState([]);

    

    const handleXChange = (eventKey) => {
        setXMetric(eventKey);
    };

    const handleYChange = (eventKey) => {
        setYMetric(eventKey);
    };

    const handleAggregatedXChange = (eventKey) => {
        setAggregatedXMetric(eventKey);
    };

    const handleAggregatedYChange = (eventKey) => {
        setAggregatedYMetric(eventKey);
    };

    useEffect(() => {
        fetch(`http://localhost:4200/retail-data-2009-2010?limit=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data from /retail-data-2009-2010:', data);
            setRetailData1(prevData => [...prevData, ...data]);
            
            const transformedData = data.map(item => ({
              ...item,
              InvoiceDate: new Date(item.InvoiceDate).toISOString().split('T')[0], // Convert to a simple date string
              Sales: item.Quantity * item.Price
            }));
            setProcessedRetailData1(prevData => [...prevData, ...transformedData]);
        })        
        .catch(err => console.error('There has been a problem with your fetch operation:', err));
        
        fetch(`http://localhost:4200/retail-data-2010-2011?limit=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data from /retail-data-2010-2011:', data);
            setRetailData2(prevData => [...prevData, ...data]);
            
            const aggregatedSales = data.reduce((acc, item) => {
              const sales = item.Quantity * item.Price;
              if (!acc[item.Country]) {
                acc[item.Country] = {
                  Country: item.Country,
                  Sales: 0
                };
              }
              acc[item.Country].Sales += sales;
              return acc;
            }, {});
        
            const transformedData = Object.values(aggregatedSales);
            setProcessedRetailData2(prevData => [...prevData, ...transformedData]);
        })        
        .catch(err => console.error('There has been a problem with your fetch operation:', err));

        fetch(`http://localhost:4200/retail-data-2009-2010-aggregated?limit=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const processedData = data.map(item => ({
                ...item,
                _id: new Date(item._id) // Convert InvoiceDate string to Date object
            }));
            console.log('Aggregated Data from /retail-data-2009-2010:', processedData);
            setAggregatedData1(prevData => [...prevData, ...processedData]);
        })
        .catch(err => console.error('There has been a problem with your fetch operation:', err));
            
    fetch(`http://localhost:4200/retail-data-2010-2011-aggregated?limit=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const processedData = data.map(item => ({
                ...item,
                _id: new Date(item._id) // Convert InvoiceDate string to Date object
            }));
            console.log('Aggregated Data from /retail-data-2010-2011:', processedData);
            setAggregatedData2(prevData => [...prevData, ...processedData]);
        })
        .catch(err => console.error('There has been a problem with your fetch operation:', err));
    

    }, []); // The empty array ensures this runs only on mount and not on updates

    const fetchMoreData1 = () => {
        // Fetch more data for retailData1
        fetch(`http://localhost:4200/retail-data-2009-2010?skip=${skip}`)
          .then(response => response.json())
          .then(data => {
            setRetailData1(prevData => [...prevData, ...data]);  // Append new data to existing data
            setSkip(prevSkip => prevSkip + data.length);  // Update the skip value
          })
          .catch(err => console.error(err));
    }
    
    const fetchMoreData2 = () => {
        // Fetch more data for retailData2
        fetch(`http://localhost:4200/retail-data-2010-2011?skip=${skip2}`)
          .then(response => response.json())
          .then(data => {
            setRetailData2(prevData => [...prevData, ...data]);  // Append new data to existing data
            setSkip2(prevSkip => prevSkip + data.length);  // Update the skip value
          })
          .catch(err => console.error(err));
    }

    return (
        <div>
            <h1>Data Dashboard</h1>

            <div>
                <h2>Filters</h2>
                <Dropdown onSelect={handleXChange}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic-x">
                        X Metric: {xMetric}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Price">Price</Dropdown.Item>
                        <Dropdown.Item eventKey="Invoice">Quantity</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown onSelect={handleYChange}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic-y">
                        Y Metric: {yMetric}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Quantity">Quantity</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div>
            <h2>Filters for Aggregated Data</h2>
            <Dropdown onSelect={handleAggregatedXChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic-x">
                    X Metric for Aggregated Data: {aggregatedXMetric}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="_id">Invoice Date</Dropdown.Item>
                    {/* Add additional options as needed */}
                </Dropdown.Menu>
            </Dropdown>
                        
            <Dropdown onSelect={handleAggregatedYChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic-y">
                    Y Metric for Aggregated Data: {aggregatedYMetric}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="totalQuantity">Total Quantity</Dropdown.Item>
                    {/* Add additional options as needed */}
                </Dropdown.Menu>
            </Dropdown>
        </div>

            <div>
                <h2>Regular Data Visualizations</h2>
                <h3>retail-data-2009-2010</h3>
                {Array.isArray(retailData1) && retailData1.length > 0 && (
                    <LineChart width={500} height={300} data={retailData1}>
                    <Line type="monotone" dataKey={yMetric} stroke="#8884d8" />
                    <XAxis dataKey={xMetric}>
                        <Label value={xMetric} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value={yMetric} angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Brush dataKey={xMetric} height={30} stroke="#8884d8" />
                    </LineChart>
                )}

                <h3>Data Set 2</h3>
                {Array.isArray(retailData2) && retailData2.length > 0 && (
                    <BarChart width={500} height={300} data={retailData2}>
                    <Bar dataKey={yMetric} fill="#82ca9d" />
                    <XAxis dataKey={xMetric}>
                        <Label value={xMetric} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value={yMetric} angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Brush dataKey={xMetric} height={30} stroke="#82ca9d" />
                    </BarChart>
                )}
                <Button variant="primary" onClick={fetchMoreData1}>Load More 2009-2010 Data</Button>
                <Button variant="primary" onClick={fetchMoreData2}>Load More 2010-2011 Data</Button>
            </div>

            <div>
            <h2>Aggregated Data Visualizations</h2>
            <h3>retail-data-2009-2010</h3>
            {Array.isArray(aggregatedData1) && aggregatedData1.length > 0 && (
                <LineChart width={500} height={300} data={aggregatedData1}>
                    <Line type="monotone" dataKey={aggregatedYMetric} stroke="#8884d8" />
                    <XAxis dataKey={aggregatedXMetric}>
                        <Label value={aggregatedXMetric} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={['dataMin', 'dataMax']}>
                        <Label value={aggregatedYMetric} angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Brush dataKey={aggregatedXMetric} height={30} stroke="#8884d8" />
                </LineChart>
            )}

            <h3>Data Set 2</h3>
            {Array.isArray(aggregatedData2) && aggregatedData2.length > 0 && (
                <BarChart width={500} height={300} data={aggregatedData2}>
                    <Bar dataKey={aggregatedYMetric} fill="#82ca9d" />
                    <XAxis dataKey={aggregatedXMetric}>
                        <Label value={aggregatedXMetric} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={['dataMin', 'dataMax']}>
                        <Label value={aggregatedYMetric} angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Brush dataKey={aggregatedXMetric} height={30} stroke="#82ca9d" />
                </BarChart>
            )}
        </div>
        <div>
        <h2>Time Series Analysis of Sales</h2>
        {Array.isArray(processedRetailData1) && processedRetailData1.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={processedRetailData1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <XAxis dataKey="InvoiceDate" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Sales" stroke="#8884d8" fillOpacity={1} fill="url(#salesColor)" />
            </AreaChart>
            </ResponsiveContainer>
        )}
        </div>

        <div>
        <h2>Sales by Country</h2>
        {Array.isArray(processedRetailData2) && processedRetailData2.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedRetailData2} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Sales" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
        )}
        </div>
    </div>
);
}

export default Dashboard;
