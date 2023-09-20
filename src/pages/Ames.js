/*import React, { useState } from 'react';
import axios from 'axios';

function Ames() {
    const [inputs, setInputs] = useState({
        OverallQual: 5,  // Default to median value
        GrLivArea: "1000-1500",  // Default range
        GarageCars: 2,  // Default to common value
        GarageArea: "200-400",  // Default range
        TotalBsmtSF: "500-1000",  // Default range
        // ... default values for advanced features can be added here ...
    });
    const [prediction, setPrediction] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/predict', inputs);
        setPrediction(response.data.prediction);
    };*/

    return (
        <div>
            <h1>House Price Prediction</h1>
            <form onSubmit={handleSubmit}>
                {/* Input for OverallQual */}
                <label>
                    Overall Quality:
                    <select name="OverallQual" value={inputs.OverallQual} onChange={handleChange}>
                        {[...Array(10).keys()].map(i => 
                            <option key={i+1} value={i+1}>{i+1}</option>
                        )}
                    </select>
                </label>

                {/* Input for GrLivArea */}
                <label>
                    Living Area (sq ft):
                    <select name="GrLivArea" value={inputs.GrLivArea} onChange={handleChange}>
                        <option value="0-1000">0-1000</option>
                        <option value="1000-1500">1000-1500</option>
                        {/* ... Add more ranges as needed ... */}
                    </select>
                </label>

                {/* Inputs for GarageCars, GarageArea, TotalBsmtSF ... */}
                {/* Similar structure as above */}

                <h2>Advanced Options</h2>
                {/* Input components for other less critical features */}
                {/* Example: if you want to allow users to input values for a feature like "LotArea" */}
                <label>
                    Lot Area:
                    <input type="text" name="LotArea" value={inputs.LotArea} onChange={handleChange} />
                </label>
                {/* Add more input components for other features as needed */}

                <button type="submit">Predict</button>
            </form>
            <h2>Prediction: {prediction}</h2>
        </div>
    );
}

export default Ames;
