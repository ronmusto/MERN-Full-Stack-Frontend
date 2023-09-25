import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/Travel.module.css';

const Travel = () => {
  const [vacations, setVacations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch vacations from the API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/vacations`)
      .then((response) => response.json())
      .then((data) => setVacations(data))
      .catch((error) => console.error('Error fetching vacations:', error));
  }, []);

  // Filter vacations based on search term
  const filteredVacations = vacations.filter(vacation =>
    vacation.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <div>
    {/* Separate container for the search bar to position it at the top */}
    <div className={styles.searchContainer}>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        className={styles.searchBar}  
      />
    </div>
    {/* Existing container for vacations */}
    <div className={styles.travelContainer}>
      {filteredVacations.map(vacation => (
        <div key={vacation._id} className={styles.vacationTile}>
          <h2>{vacation.destination}</h2>
          <p>{vacation.description}</p>
          <Link to={`/vacation/${vacation._id}`} className={styles.vacationLink}>Learn More</Link>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Travel;
