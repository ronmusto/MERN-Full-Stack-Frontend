import React, { useEffect, useState } from 'react';
import '../CSS/Dashboard.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import styles from '../CSS/Dashboard.module.css';
import moment from 'moment';
import Plot from 'react-plotly.js';
import {ReferenceDot, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Label, Brush, PieChart, 
    Pie, ScatterChart, Scatter, CartesianGrid, Legend, Cell, ResponsiveContainer, Area, AreaChart, 
    Histogram  } from 'recharts';

function Dashboard() {
    const [timeSeriesData, setTimeSeriesData] = useState([]);
    const [aggregatedTimeFrame, setAggregatedTimeFrame] = useState('day');
    const [dataByCountry09, setDataByCountry09 ] = useState([]);
    const [dataByCountry11, setDataByCountry11 ] = useState([]);
    const [heatMapData, setHeatMapData] = useState([]);

    // Tick formatter function
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        
        let date = new Date(timestamp); // Convert timestamp back to Date object for formatting
        const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
        const formattedDay = String(date.getDate()).padStart(2, '0');
        const formattedYear = date.getFullYear();
        
        return `${formattedMonth}/${formattedDay}/${formattedYear}`;
    };

    const handleAggregatedTimeFrameChange = (eventKey) => {
        setAggregatedTimeFrame(eventKey);
    };

    /////////////////////////////
    /*    FETCH FUNCTIONS      */
    /////////////////////////////

    // Function to fetch heatmap data
    const fetchHeatMapData = () => {
        fetch('http://localhost:4200/heatmap-data')
            .then(response => response.json())
            .then(data => {
            // Prepare data for the heatmap
            const countries = [];
            const z = data.map(item => {
                countries.push(item._id);
                return [item.totalSales, item.totalQuantity];
            });
    
            setHeatMapData({ countries, z });
            })
        .catch(err => console.error('Error fetching heatmap data:', err));
    };    

    const fetchAggregateByCountry2010_2011 = () => {
        fetch('http://localhost:4200/aggregate-by-country-2010-2011')
            .then(response => response.json())
            .then(data => setDataByCountry09(data))
            .catch(err => console.error('Error fetching aggregated data by country 2010-2011:', err));
    };

    const fetchAggregateByCountry2009_2010 = () => {
        fetch('http://localhost:4200/aggregate-by-country-2009-2010')
            .then(response => response.json())
            .then(data => setDataByCountry11(data))
            .catch(err => console.error('Error fetching aggregated data by country 2009-2010:', err));
    };
    
    const fetchTimeSeriesData = () => {
        
        fetch(`http://localhost:4200/retail-data-2009-2010-aggregated-timeframe?timeFrame=${aggregatedTimeFrame}&limit=1000000`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const processedData = data.map(item => {
              let invoiceDate;
              if (item._id.week) { // Week aggregation
                invoiceDate = moment().year(item._id.year).week(item._id.week).toDate().getTime();
              } else if (item._id.hour) { // Hour aggregation
                invoiceDate = moment({ year: item._id.year, month: item._id.month - 1, day: item._id.day, hour: item._id.hour }).toDate().getTime();
              } else { // Day, month, or other aggregations
                invoiceDate = new Date(item._id.year, item._id.month - 1, item._id.day || 1).getTime();
              }
              return {
                ...item,
                InvoiceDate: invoiceDate
              };
            });
            console.log(`Time Series Data from /retail-data-2009-2010:`, processedData);
            setTimeSeriesData(processedData);
          })
          .catch(err => console.error('There has been a problem with your fetch operation:', err));
      };

    //Invoke fetch functions
    useEffect(() => {

        fetchTimeSeriesData();

        fetchHeatMapData();

        fetchAggregateByCountry2010_2011();

        fetchAggregateByCountry2009_2010();

    }, [aggregatedTimeFrame]);

//JSX for dashboard
return (
    <div className={styles['dashboard-container']}>
        <h1 className={styles['dashboard-header']}>Data Dashboard</h1>
        <div className={styles['blue-dropdown-toggle']}>
            <h2>Filters for Data</h2>
            <Dropdown onSelect={handleAggregatedTimeFrameChange}>
            <Dropdown.Toggle className={styles['custom-dropdown-toggle']} variant="success" id="dropdown-basic-aggregated-timeframe">
                Aggregated Timeframe: {aggregatedTimeFrame}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className={styles['custom-dropdown-item']} eventKey="hour">Hour</Dropdown.Item>
                <Dropdown.Item className={styles['custom-dropdown-item']} eventKey="day">Day</Dropdown.Item>
                <Dropdown.Item className={styles['custom-dropdown-item']} eventKey="week">Week</Dropdown.Item>
                <Dropdown.Item className={styles['custom-dropdown-item']} eventKey="month">Month</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
        <div className={styles['data-visualizations-container']}>
            <h2>Data Visualizations</h2>
            <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Time Series Analysis of Sales</h2>
                {Array.isArray(timeSeriesData) && timeSeriesData.length > 0 && (
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={timeSeriesData} margin={{ top: 10, right: 85, left: 30, bottom: 70 }}>
                            <defs>
                                <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="InvoiceDate" tickFormatter={formatDate}>
                                <Label value="Date" offset={-50} position="insideBottom" />
                            </XAxis>
                            <YAxis>
                                <Label value="Sales Volume" angle={-90} position="insideLeft" offset={-10} /> {/* Label for y-axis */}
                            </YAxis>
                            <Tooltip content={({ payload, label }) => {
                                if (payload && payload.length > 0) {
                                    const data = payload[0].payload;
                                    // Format the total sales as USD
                                    const totalSalesFormatted = new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }).format(data.totalSales);

                                    // Extract the date and optionally the hour
                                    const dateObj = new Date(data.InvoiceDate);
                                    const dateStr = dateObj.toLocaleDateString();
                                    const timeStr = data._id.hour ? dateObj.toLocaleTimeString() : ''; // Include the time if hour is present

                                    return (
                                        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                                            <p>Date: {dateStr} {timeStr}</p> {/* Include the time here */}
                                            <p>Total Quantity: {data.totalQuantity}</p>
                                            <p>Total Sales: {totalSalesFormatted}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                            />
                            <Area type="monotone" dataKey="totalQuantity" stroke="#8884d8" fillOpacity={1} fill="url(#salesColor)" />
                            <Brush dataKey="InvoiceDate" height={30} stroke="#8884d8" tickFormatter={formatDate} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Total Sales in $USD by Country 2010-2011</h2>
                {Array.isArray(dataByCountry09) && dataByCountry09.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataByCountry09} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" name="Country" />
                            <YAxis name="Total Sales Value ($)" />
                            <Tooltip />
                            <Bar dataKey="totalSales" name="Total Sales Value ($)" fill="#82ca9d" />
                            <Brush dataKey="_id" height={20} stroke="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Total Sales in $USD by Country 2009-2010</h2>
                {Array.isArray(dataByCountry11) && dataByCountry11.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataByCountry11} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" name="Country" />
                            <YAxis name="Total Sales Value ($)" />
                            <Tooltip />
                            <Bar dataKey="totalSales" name="Total Sales Value ($)" fill="#82ca9d" />
                            <Brush dataKey="_id" height={20} stroke="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Heatmap of Sales Data by Country</h2>
                <div className={styles['plot-container']}>
                    {heatMapData && heatMapData.countries && (
                        <Plot
                            data={[
                                {
                                    z: heatMapData.z,
                                    x: ['Total Sales', 'Total Quantity'],
                                    y: heatMapData.countries,
                                    type: 'heatmap',
                                    colorscale: 'Viridis',
                                },
                            ]}
                            layout={{
                                title: 'Heatmap of Sales and Quantity by Country',
                                xaxis: { title: 'Metrics' },
                                yaxis: { title: 'Country' },
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    </div>
);
}

export default Dashboard;