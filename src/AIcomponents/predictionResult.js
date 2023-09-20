import React from 'react';
import styles from '../CSS/AI.module.css';

const PredictionResult = ({ prediction }) => {
    return (
        <div data-testid="prediction-result" id="prediction" className={styles.predictionResult}>
            {prediction}
        </div>
    );
}

export default PredictionResult;
