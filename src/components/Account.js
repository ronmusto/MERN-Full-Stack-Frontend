import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from './UserContext';
import AccountView from '../pages/AccountView';

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
    <AccountView userData={userData} bookedVacations={bookedVacations} deleteBooking={deleteBooking} updateBookingDates={updateBookingDates} startDateRef={startDateRef} endDateRef={endDateRef} />
    </UserContext.Provider>);
};

export default Account;
