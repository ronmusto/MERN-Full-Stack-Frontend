import React, { useState } from 'react';
import axios from 'axios';

function AI() {
  const [inputs, setInputs] = useState({
    OverallQual: '5',
    GrLivArea: '1500',
    YearBuilt: '2000',
    TotRmsAbvGrd: '6',
    GarageCars: '2'
  });
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/predict', { input: Object.values(inputs).map(parseFloat) })
      .then(response => {
        setPrediction(response.data.prediction);
      })
      .catch(error => {
        console.error("Error making prediction:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.entries(inputs).map(([feature, value]) => (
          <div key={feature}>
            <label>{feature}:</label>
            <input type="number" name={feature} value={value} onChange={handleInputChange} />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Predicted Value: ${prediction.toFixed(2)}</p>}
    </div>
  );
}

export default AI;
