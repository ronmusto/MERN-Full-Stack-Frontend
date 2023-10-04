import { useEffect, useState } from 'react';
import moment from 'moment';

export function useDashboardLogic() {
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

    return {
        timeSeriesData,
        setTimeSeriesData,
        aggregatedTimeFrame,
        setAggregatedTimeFrame,
        dataByCountry09,
        setDataByCountry09,
        dataByCountry11,
        setDataByCountry11,
        heatMapData,
        setHeatMapData,
        formatDate,
        handleAggregatedTimeFrameChange,
    };
}
