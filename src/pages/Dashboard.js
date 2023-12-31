import React from 'react';
import '../CSS/Dashboard.module.css';
import { Container, Row, Col, Dropdown, Card } from 'react-bootstrap';
import styles from '../CSS/Dashboard.module.css';
import { useDashboardLogic } from '../components/DashboardLogic';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { XAxis, YAxis, Tooltip, BarChart, Bar, Label, Brush, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

function Dashboard() {
    const {
        timeSeriesData,
        aggregatedTimeFrame,
        dataByCountry09,
        dataByCountry11,
        heatMapData,
        formatDate,
        handleAggregatedTimeFrameChange,
    } = useDashboardLogic();

//JSX for dashboard
return (
    <Container fluid className="bg-light text-dark p-4">
        <Row className="mb-4">
        <Col>
            <Dropdown onSelect={handleAggregatedTimeFrameChange}>
            <Dropdown.Toggle className="btn-success">
                Aggregated Timeframe: {aggregatedTimeFrame}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="hour">Hour</Dropdown.Item>
                <Dropdown.Item eventKey="day">Day</Dropdown.Item>
                <Dropdown.Item eventKey="week">Week</Dropdown.Item>
                <Dropdown.Item eventKey="month">Month</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </Col>
        </Row>

        {/* Time Series Analysis Section */}
        <Card className="mb-5">
        <Card.Body>
            <Card.Title>Time Series Analysis of Foreign Sales</Card.Title>
            <Card.Text>
                    This interactive area chart offers a detailed look at the trend of foreign sales over various time periods. By selecting different aggregation timeframes (e.g., hour, day, week, or month) from the dropdown above, you can customize the chart to display data in a way that best suits your analytical needs.
                     The x-axis represents the date, while the y-axis shows the sales volume. Hover over the chart to view a tooltip that provides additional metrics, such as total sales and total quantity, for each time point. The brush feature at the bottom allows you to zoom into specific date ranges for a closer look. 
                     This chart serves as a valuable tool for identifying sales patterns and peak sales periods.
                    </Card.Text>
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
                                        { style: 'currency', currency: 'GBP' }).format(data.totalSales);

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
        </Card.Body>
        </Card>
            <div className={styles['visualization-section']}>
                <h2 className={styles['visualization-title']}>Total Foreign Sales in GBP by Country 2010-2011</h2>
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
                                        { style: 'currency', currency: 'GBP' }).format(data.totalSales);

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
                <h2 className={styles['visualization-title']}>Total Foreign Sales in GBP by Country 2009-2010</h2>
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
                                        { style: 'currency', currency: 'GBP' }).format(data.totalSales);

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
        <small className="d-block mt-4 text-muted">
            Disclaimer: The data presented in this chart is sourced from Chen,Daqing's "Online Retail II" dataset available at the UCI Machine Learning Repository 
            (<a href="https://doi.org/10.24432/C5CG6D" target="_blank" rel="noopener noreferrer">https://doi.org/10.24432/C5CG6D</a>). This information is intended 
            to be a demonstration only and should not be construed as financial or investment advice. All visualizations and interpretations are the author's own and 
            users should exercise caution and independent judgment when using this data for decision-making.
        </small>
    </Container>
    );
}

export default Dashboard;