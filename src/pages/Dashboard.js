import React, { useEffect, useState } from 'react';
import '../CSS/Dashboard.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../CSS/Dashboard.module.css';
import moment from 'moment';
import Plot from 'react-plotly.js';
import { XAxis, YAxis, Tooltip, BarChart, Bar, Label, Brush, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

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

    // Function to fetch heatmap data
    const fetchHeatMapData = () => {
        fetch(`${process.env.REACT_APP_BACKEND}/heatmap-data`)
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
        fetch(`${process.env.REACT_APP_BACKEND}/aggregate-by-country-2010-2011`)
            .then(response => response.json())
            .then(data => setDataByCountry09(data))
            .catch(err => console.error('Error fetching aggregated data by country 2010-2011:', err));
    };

    const fetchAggregateByCountry2009_2010 = () => {
        fetch(`${process.env.REACT_APP_BACKEND}/aggregate-by-country-2009-2010`)
            .then(response => response.json())
            .then(data => setDataByCountry11(data))
            .catch(err => console.error('Error fetching aggregated data by country 2009-2010:', err));
    };
    
    const fetchTimeSeriesData = () => {
        
        fetch(`${process.env.REACT_APP_BACKEND}/retail-data-2009-2010-aggregated-timeframe?timeFrame=${aggregatedTimeFrame}&limit=1000000`)
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
        <h1 className={styles['dashboard-header']}></h1>
        <div className={styles['blue-dropdown-toggle']}>
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
            <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Time Series Analysis of Foreign Sales</h2>
                <p className={styles['visualization-description']}>
                    This interactive area chart offers a detailed look at the trend of foreign sales over various time periods. By selecting different aggregation timeframes (e.g., hour, day, week, or month) from the dropdown above, you can customize the chart to display data in a way that best suits your analytical needs.
                     The x-axis represents the date, while the y-axis shows the sales volume. Hover over the chart to view a tooltip that provides additional metrics, such as total sales and total quantity, for each time point. The brush feature at the bottom allows you to zoom into specific date ranges for a closer look. 
                     This chart serves as a valuable tool for identifying sales patterns and peak sales periods.
                </p>
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
                <h2 className={styles['visualization-title']}>Total Foreign Sales in pounds sterling check this by Country 2010-2011</h2>
                <p className={styles['visualization-description']}>
                    This bar chart serves as a powerful demonstration tool for comparing total sales across various countries for the year 2009. 
                    Each bar represents a different country, and the height of the bar indicates the total sales value in U.S. dollars for that country. 
                    The x-axis enumerates the countries, while the y-axis shows the sales value in a quantitative measure. By hovering over each bar, you 
                    can view a tooltip that provides additional information, such as the exact total sales for each country. The chart also includes a brush 
                    feature at the bottom that allows you to focus on specific countries by selecting a narrower range. This visualization can be particularly 
                    useful for stakeholders, analysts, and decision-makers to understand market penetration in different countries and to identify potential opportunities or areas for improvement.
                </p>
                {Array.isArray(dataByCountry09) && dataByCountry09.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataByCountry09} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" name="Country" />
                            <YAxis name="Total Sales Value ($)" />
                            <Tooltip content={({ payload, label }) => {
                                if (payload && payload.length > 0) {
                                    const data = payload[0].payload;

                                    // Format the total sales as USD
                                    const totalSalesFormatted = new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }).format(data.totalSales);

                                    // Extract the date and optionally the hour
                                    const countryName = data._id; // Assume country name is stored in _id

                                    return (
                                        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                                            <p>Country: {countryName}</p>
                                            <p>Total Sales: {totalSalesFormatted}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                            />
                            <Bar dataKey="totalSales" name="Total Sales Value ($)" fill="#82ca9d" />
                            <Brush dataKey="_id" height={20} stroke="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Total Foreign Sales in pounds sterling check this by Country 2009-2010</h2>
                <p className={styles['visualization-description']}>
                    Similar to the 2009 chart, this visualization highlights the sales distribution across countries for the year 2011. 
                    Compare and analyze the growth or decline in sales for each country from the previous chart.
                </p>
                {Array.isArray(dataByCountry11) && dataByCountry11.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataByCountry11} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" name="Country" />
                            <YAxis name="Total Sales Value ($)" />
                            <Tooltip content={({ payload, label }) => {
                                if (payload && payload.length > 0) {
                                    const data = payload[0].payload;

                                    // Format the total sales as USD
                                    const totalSalesFormatted = new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }).format(data.totalSales);

                                    // Extract the date and optionally the hour
                                    const countryName = data._id; // Assume country name is stored in _id

                                    return (
                                        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                                            <p>Country: {countryName}</p>
                                            <p>Total Sales: {totalSalesFormatted}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                            />
                            <Bar dataKey="totalSales" name="Total Sales Value ($)" fill="#82ca9d" />
                            <Brush dataKey="_id" height={20} stroke="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
           {/* Heatmap Section */}
           <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Heatmap of Foreign Sales Data by Country</h2>
                <div className={styles['plot-container']} style={{ width: '100%' }}>
                    {heatMapData && heatMapData.countries && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
                        {/* Heatmap for Total Sales */}
                        <div style={{ flex: '1 1 auto' }}>
                        <Plot
                            responsive={true}
                            useResizeHandler={true}
                            data={[
                            {
                                z: heatMapData.z.map(row => [row[0]]),
                                x: ['Total Sales'],
                                y: heatMapData.countries,
                                type: 'heatmap',
                                colorscale: 'Viridis',
                            },
                            ]}
                            layout={{
                            title: 'Heatmap of Total Sales by Country',
                            xaxis: { title: 'Metrics' },
                            yaxis: { title: 'Country' },
                            autosize: true,
                            margin: { l: 150 },
                            }}
                        />
                        </div>

                        {/* Heatmap for Total Quantity */}
                        <div style={{ flex: '1 1 auto' }}>
                        <Plot
                            responsive={true}
                            useResizeHandler={true}
                            data={[
                            {
                                z: heatMapData.z.map(row => [row[1]]),
                                x: ['Total Quantity'],
                                y: heatMapData.countries,
                                type: 'heatmap',
                                colorscale: 'Inferno',
                            },
                            ]}
                            layout={{
                            title: 'Heatmap of Total Quantity by Country',
                            xaxis: { title: 'Metrics' },
                            yaxis: { title: 'Country' },
                            autosize: true,
                            margin: { l: 150 },
                            }}
                        />
                        </div>
                    </div>
                    )}
                </div>
            </div>
            
            <small className={styles['legal-disclaimer']}>
                {/* Legal Disclaimer */}
            </small>
        </div>
    </div>
            <small className={styles['legal-disclaimer']}>
                Disclaimer: The data presented in this chart is sourced from Chen,Daqing's "Online Retail II" dataset available at the UCI Machine Learning Repository 
                (<a href="https://doi.org/10.24432/C5CG6D" target="_blank" rel="noopener noreferrer">https://doi.org/10.24432/C5CG6D</a>). This information is intended 
                to be a demonstration only and should not be construed as financial or investment advice. All visualizations and interpretations are the author's own and 
                users should exercise caution and independent judgment when using this data for decision-making.
            </small>
            </div>
    );
}

export default Dashboard;