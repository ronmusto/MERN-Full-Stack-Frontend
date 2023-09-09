import React from 'react';
import styles from '../CSS/AI.module.css';

const PredictionForm = ({ inputs, handleChange, handleSubmit }) => {
    return (
        <div>
            <h1 className={styles.formTitle}>My Prediction Form</h1>
            <form data-testid="predict-form" onSubmit={handleSubmit}>
            {['Median Income (0 to 10)', 'House Age (0 to 50)', 'Average Rooms (0 to 10)', 
            'Average Bedrooms (0 to 5)', 'Population (0 to 5000)', 'Average Occupancy (0 to 10)',
            'Latitude (33 to 42)', 'Longitude (-124 to -114)']
            .map((title, index) => (
                <div key={index} className={styles.formGroup}>
                    <h3 className={styles.formSubtitle}>{title}:</h3>
                    <input type="number" onChange={handleChange} 
                        value={inputs[Object.keys(inputs)[index]]} 
                        data-testid={Object.keys(inputs)[index]}
                        name={Object.keys(inputs)[index]}
                        className={styles.formInput} />
                </div>
            ))}
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.formButton}>Predict</button>
                </div>
            </form>
        </div>
    );
}

export default PredictionForm;
