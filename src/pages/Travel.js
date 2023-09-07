import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/Travel.module.css';

const Travel = () => {
  const [vacations, setVacations] = useState([]);

  // Fetch vacations from the API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/vacations`)
      .then((response) => response.json())
      .then((data) => setVacations(data))
      .catch((error) => console.error('Error fetching vacations:', error));
  }, []);

  return (
    <div className={styles.travelContainer}>
      {vacations.map((vacation) => (
        <div key={vacation._id} className={styles.vacationTile}>
          <h2>{vacation.destination}</h2>
          <p>{vacation.description}</p>
          <Link to={`/vacation/${vacation._id}`} className={styles.vacationLink}>Learn More</Link>
        </div>
      ))}
    </div>
  );
};

export default Travel;
