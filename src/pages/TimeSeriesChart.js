import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, CategoryScale, TimeScale } from 'chart.js';

// Register the components
Chart.register(LineController, LineElement, PointElement, CategoryScale, TimeScale);

const TimeSeriesChart = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (data && data.length) {
            const ctx = canvasRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(item => item._id),  // Dates
                    datasets: [{
                        label: 'Quantity Sold',
                        data: data.map(item => item.Quantity),  // Quantities
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Quantity'
                            }
                        }
                    }
                }
            });
        }
    }, [data]);

    return <canvas ref={canvasRef} />;
};

export default TimeSeriesChart;
