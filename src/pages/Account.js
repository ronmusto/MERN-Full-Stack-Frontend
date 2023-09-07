import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../components/UserContext';
import styles from '../CSS/Account.module.css';

const Account = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [bookedVacations, setBookedVacations] = useState([]);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const fetchAccountData = () => {
    // Ensure there's a user ID available
    if (!user._id) {
      console.error('User or User ID is not available');
      return;
    }

    //fetch user account details
    fetch(`${process.env.REACT_APP_BACKEND}/user-data/${user._id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setUserData(data))
      .catch(err => console.error('Error fetching specified user data', err));
  };

  //delete user vacations
  const deleteBooking = (bookingID) => {
    fetch(`${process.env.REACT_APP_BACKEND}/delete-booked-vacation/${bookingID}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchBookedVacations();  // Re-fetch bookings after deletion
        } else {
            console.error('Failed to delete booking:', data.error);
        }
    })
    .catch(err => console.error('Error deleting booking:', err));
  };

  //update user booking dates
  const updateBookingDates = (bookingID, newStartDate, newEndDate) => {
    fetch(`${process.env.REACT_APP_BACKEND}/update-booked-vacation/${bookingID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate: newStartDate, endDate: newEndDate })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchBookedVacations();  // Re-fetch bookings after update
        } else {
            console.error('Failed to update booking:', data.error);
        }
    })
    .catch(err => console.error('Error updating booking:', err));
  };
  
  // Fetch the vacations booked by the user
  const fetchBookedVacations = () => {
    // Ensure there's a user ID available
    if (!user._id) {
      console.error('User or User ID is not available');
      return;
    }
    // Fetch the vacations booked by the user
    fetch(`${process.env.REACT_APP_BACKEND}/user-booked-vacations/${user._id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setBookedVacations(data))
      .catch(err => console.error('Error fetching booked vacations', err));
  };

  useEffect(() => {  
    fetchAccountData();
    fetchBookedVacations();
  }, [user && user._id]);

  return (
    <UserContext.Provider value={user}>
    <div className={styles.accountContainer}>
      <div className={styles.accountDetails}>
        <h2>{userData.username}</h2>
        <p>Email: {userData.email}</p>
      </div>

      <div className={styles.bookedVacations}>
        {bookedVacations.map((vacation) => (
          <div key={vacation.vacationDetails.id} className={styles.bookedVacationTile}>
            <h3>{vacation.vacationDetails.destination}</h3>
            <p>{vacation.vacationDetails.description}</p>
            <p>Price: ${vacation.vacationDetails.price}</p>
            <p>Arrival: {new Date(vacation.startDate).toLocaleDateString()}</p>
            <p>Departure: {new Date(vacation.endDate).toLocaleDateString()}</p>
            <div className={styles.vacationImages}>
              {vacation.vacationDetails.images.split(';').map((img, index) => (
                <img key={index} src={`https://app.renaldomusto.com/images/${img}`} alt={`Image ${index}`} />
              ))}
            <button onClick={() => deleteBooking(vacation._id)} className={styles.deleteButton}>Delete</button>
            <input type="date" defaultValue={vacation.startDate} ref={startDateRef} />
            <input type="date" defaultValue={vacation.endDate} ref={endDateRef} />
            <button onClick={() => updateBookingDates(vacation._id, startDateRef.current.value, endDateRef.current.value)} className={styles.updateButton}>Update Dates</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </UserContext.Provider>
  );
};

export default Account;
