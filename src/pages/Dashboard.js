import React, { useEffect, useState } from 'react';
import './Dashboard.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Dashboard.module.css';
import {ReferenceDot, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Label, Brush, PieChart, 
    Pie, ScatterChart, Scatter, CartesianGrid, Legend, Cell, ResponsiveContainer, Area, AreaChart, 
    Histogram, HeatMap  } from 'recharts';

function Dashboard() {
    const [aggregatedData1, setAggregatedData1] = useState([]);
    const [aggregatedData2, setAggregatedData2] = useState([]);
    const [xMetric, setXMetric] = useState('Price');
    const [yMetric, setYMetric] = useState('Quantity');
    const [skip1, setSkip1] = useState(0);
    const [skip2, setSkip2] = useState(0);
    const [aggregatedXMetric, setAggregatedXMetric] = useState('_id');
    const [aggregatedYMetric, setAggregatedYMetric] = useState('totalQuantity');
    const [aggregatedTimeFrame, setAggregatedTimeFrame] = useState('day');
    const [dataByCountry, setDataByCountry] = useState([]);

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

    const handleAggregatedTimeFrameChange = (eventKey) => {
        setAggregatedTimeFrame(eventKey);
    };    

    useEffect(() => {

        fetch('http://localhost:4200/aggregate-by-country-2010-2011')
        .then(response => response.json())
        .then(data => setDataByCountry(data))
        .catch(err => console.error('Error fetching aggregated data by country 2010-2011:', err));

        fetch(`http://localhost:4200/retail-data-2009-2010-aggregated-timeframe?timeFrame=${aggregatedTimeFrame}&limit=100`)
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
                console.log(`Aggregated Data from /retail-data-2009-2010 (Timeframe: ${aggregatedTimeFrame}):`, processedData);
                setAggregatedData1(processedData);
            })
            .catch(err => console.error('There has been a problem with your fetch operation:', err));
    
        fetch(`http://localhost:4200/retail-data-2010-2011-aggregated-timeframe?timeFrame=${aggregatedTimeFrame}&limit=100`)
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
                console.log(`Aggregated Data from /retail-data-2010-2011 (Timeframe: ${aggregatedTimeFrame}):`, processedData);
                setAggregatedData2(processedData);
            })
            .catch(err => console.error('There has been a problem with your fetch operation:', err));
    
    }, [aggregatedTimeFrame, aggregatedXMetric, aggregatedYMetric]);    

    const fetchMoreData1 = () => {
        fetch(`http://localhost:4200/retail-data-2009-2010-aggregated-timeframe?timeFrame=${aggregatedTimeFrame}&limit=100&skip=${skip1}`)
            .then(response => response.json())
            .then(data => {
                setAggregatedData1(prevData => [...prevData, ...data]);
                setSkip1(prevSkip => prevSkip + data.length);
            })
            .catch(err => console.error(err));
    };
    
    const fetchMoreData2 = () => {
        fetch(`http://localhost:4200/retail-data-2010-2011-aggregated-timeframe?timeFrame=${aggregatedTimeFrame}&limit=100&skip=${skip2}`)
            .then(response => response.json())
            .then(data => {
                setAggregatedData2(prevData => [...prevData, ...data]);
                setSkip2(prevSkip => prevSkip + data.length);
            })
            .catch(err => console.error(err));
    };    

    return (
        <div>
            <h1>Data Dashboard</h1>

            <div>
            <h2>Filters for Aggregated Data</h2>
            <Dropdown onSelect={handleAggregatedXChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic-x">
                    X Metric for Data: {aggregatedXMetric}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="InvoiceDate">Invoice Date</Dropdown.Item>
                    <Dropdown.Item eventKey="StockCode">Stock Code</Dropdown.Item>
                    <Dropdown.Item eventKey="Description">Description</Dropdown.Item>
                    <Dropdown.Item eventKey="Country">Country</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
                                
            <Dropdown onSelect={handleAggregatedYChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic-y">
                    Y Metric for Data: {aggregatedYMetric}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Quantity">Quantity</Dropdown.Item>
                    <Dropdown.Item eventKey="Price">Price</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={handleAggregatedTimeFrameChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic-aggregated-timeframe">
                    Aggregated Timeframe: {aggregatedTimeFrame}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="hour">Hour</Dropdown.Item>
                    <Dropdown.Item eventKey="day">Day</Dropdown.Item>
                    <Dropdown.Item eventKey="week">Week</Dropdown.Item>
                    <Dropdown.Item eventKey="month">Month</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Button onClick={fetchMoreData1}>Load More Data for 2009-2010</Button>
            <Button onClick={fetchMoreData2}>Load More Data for 2010-2011</Button>

        </div>

            <div>
            <h2>Data Visualizations</h2>
            <h3>Retail-data-2009-2010</h3>
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

            <h3>Retail-data-2010-2011</h3>
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
        {Array.isArray(aggregatedData1) && aggregatedData1.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={aggregatedData1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="totalQuantity" stroke="#8884d8" fillOpacity={1} fill="url(#salesColor)" />
            </AreaChart>
            </ResponsiveContainer>
        )}
        </div>

        {/* Visualizing the aggregated data by country using a BarChart */}
        <div>
            <h2>Total Sales in $USD by Country 2010-2011</h2>
            {Array.isArray(dataByCountry) && dataByCountry.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataByCountry} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" name="Country" />
                    <YAxis name="Total Sales Value ($)" />
                    <Tooltip />
                    <Bar dataKey="totalSales" name="Total Sales Value ($)" fill="#82ca9d" />
                    <Brush dataKey="_id" height={30} stroke="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            )}
        </div>
    </div>
);
}

export default Dashboard;