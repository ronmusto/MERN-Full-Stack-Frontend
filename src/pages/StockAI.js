import React, { useState } from 'react';

const StockPrediction = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeSymbol = (event) => {
    setStockSymbol(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null); // Reset error message

    fetch('http://localhost:5000/predict-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stockSymbol }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction[0]); // Assuming prediction is a single value
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to predict stock price. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Next Day Stock Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="stockSymbol">Stock Symbol:</label>
          <input
            type="text"
            id="stockSymbol"
            name="stockSymbol"
            onChange={handleChangeSymbol}
            value={stockSymbol}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-button">Predict</button>
        </div>
      </form>
      {prediction !== null && (
        <div id="prediction">Predicted Price for {stockSymbol}: ${prediction}</div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default StockPrediction;