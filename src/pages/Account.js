import React, { useState, useEffect } from 'react';
import styles from '../CSS/Account.module.css';

const Account = () => {
  const [userData, setUserData] = useState({});
  const [bookedVacations, setBookedVacations] = useState([]);

  useEffect(() => {
    const mockUserData = {
      username: "JohnDoe",
      email: "john.doe@example.com"
    };
    const mockBookedVacations = [
      { id: 1, destination: "Paris", description: "5 days in Paris" },
      { id: 2, destination: "New York", description: "7 days in NYC" },
    ];
    
    setUserData(mockUserData);
    setBookedVacations(mockBookedVacations);
  }, []);

  return (
    <div className={styles.accountContainer}>
      <div className={styles.accountDetails}>
        <h2>{userData.username}</h2>
        <p>Email: {userData.email}</p>
      </div>

      <div className={styles.bookedVacations}>
        {bookedVacations.map((vacation) => (
          <div key={vacation.id} className={styles.bookedVacationTile}>
            <h3>{vacation.destination}</h3>
            <p>{vacation.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
