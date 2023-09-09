import React from 'react';
import { Bar } from 'react-chartjs-2';

const FeatureImportancesChart = ({ chartData, options, chartKey }) => {  // Rename key to chartKey
    return (
        <div>
            <h2>Feature Importances</h2>
            <p>This bar chart shows the importance of each feature for predicting house prices,
              according to our machine learning model. The taller the bar, the more important the
              feature. For example, if the 'Median Income' bar is taller than the 'House Age'
              bar, that means median income is a more important predictor of house price than
              house age. Note that this doesn't tell us whether house prices go up or down as
              these features increase; it only tells us how important the feature is for making
              accurate predictions.</p>
            <Bar data={chartData} options={options} />  // Remove key prop from here
        </div>
    );
}

export default FeatureImportancesChart;
