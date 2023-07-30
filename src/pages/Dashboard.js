import React, { useEffect, useState } from 'react';
import './Dashboard.module.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Label } from 'recharts';

function Dashboard() {
    const [retailData1, setRetailData1] = useState([]);
    const [retailData2, setRetailData2] = useState([]);
    const [skip, setSkip] = useState(0);
    const [skip2, setSkip2] = useState(0);
    

    useEffect(() => {
        fetch(`http://localhost:4200/retail-data-2009-2010?limit=100&skip=${skip}`)
        .then(response => response.json())
        .then(data => {
          console.log('Data from /retail-data-2009-2010:', data);
          setRetailData1(prevData => [...prevData, ...data]);  // append new data to existing data
          setSkip(prevSkip => prevSkip + data.length);  // update skip value for next request
        })
        .catch(err => console.error(err));
      
    
        fetch(`http://localhost:4200/retail-data-2010-2011?limit=100&skip=${skip2}`)
        .then(response => response.json())
        .then(data => {
          console.log('Data from /retail-data-2010-2011:', data);
          setRetailData2(prevData => [...prevData, ...data]);  // append new data to existing data
          setSkip2(prevSkip => prevSkip + data.length);  // update skip value for next request
        })
        .catch(err => console.error(err));
    }, []); // The empty array ensures this runs only on mount and not on updates

    const handleFilterChange = (filterValues) => {
        // update the data based on filter values
    };

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
                {/* Add your filters here */}
            </div>

            <div>
                <h2>Visualizations</h2>
                {/* Add your charts here */}
                    <h3>Data Set 1</h3>
                    {retailData1 && (
                        <LineChart width={500} height={300} data={retailData1}>
                        <Line type="monotone" dataKey="Quantity" stroke="#8884d8" />
                        <XAxis dataKey="Index">
                            <Label value="Index" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis>
                            <Label value="Quantity" angle={-90} position="insideLeft" />
                        </YAxis>
                        <Tooltip />
                        </LineChart>
                    )}

                    <h3>Data Set 2</h3>
                    {retailData2 && (
                        <BarChart width={500} height={300} data={retailData2}>
                        <Bar dataKey="Quantity" fill="#82ca9d" onClick={data => console.log(data)} />
                        <XAxis dataKey="Index">
                            <Label value="Index" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis>
                            <Label value="Quantity" angle={-90} position="insideLeft" />
                        </YAxis>
                        <Tooltip />
                        </BarChart>
                    )}
                <button onClick={fetchMoreData1}>Load More 2009-2010 Data</button>
                <button onClick={fetchMoreData2}>Load More 2010-2011 Data</button>
            </div>
        </div>
    );
}

export default Dashboard;
