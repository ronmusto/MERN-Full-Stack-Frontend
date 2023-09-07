import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../CSS/Checkout.module.css';
import { UserContext } from '../components/UserContext';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


const Checkout = () => {
  const userContextValue = useContext(UserContext);
  const { id } = useParams(); // Get vacation ID from URL parameters
  const { _id } = useContext(UserContext);
  const [vacation, setVacation] = useState(null);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // Fetch vacation details from the API
    fetch(`${process.env.REACT_APP_BACKEND}/vacation/${id}`)
      .then((response) => response.json())
      .then((data) => setVacation(data))
      .catch((error) => console.error('Error fetching vacation:', error));
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    
    // Create a combined object of the vacation and booking details
    const combinedDetails = {
      userID: userContextValue.user._id,
      vacationDetails: vacation, 
      userBookingDetails: bookingDetails,
      startDate: startDate,
      endDate: endDate
  };
    
    // Send combined details to the server
    fetch(`${process.env.REACT_APP_BACKEND}/bookVacation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(combinedDetails)
    })
    .then((response) => {
      if (response.ok) {
        navigate('/account'); // Navigate to confirmation or user profile page
      } else {
        // Handle error
        console.error('Error booking vacation:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error sending booking details:', error);
    });
  };

  if (!vacation) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <div className={styles.checkoutContainer}>
        <h1 className={styles.checkoutHeading}>Checkout</h1>

        <div className={styles.vacationReview}>
            <h2 className={styles.vacationDestination}>{vacation.destination}</h2>
            <p className={styles.vacationDescription}>{vacation.description}</p>
            <p className={styles.vacationPrice}>${vacation.price}</p>
        </div>

        {/* Start Date Picker */}
        <div className={styles.datePickerContainer}>
            <label>Start Date:</label>
            <DatePicker 
                className={styles.inputField} 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
        </div>

        {/* End Date Picker */}
        <div className={styles.datePickerContainer}>
            <label>End Date:</label>
            <DatePicker 
                className={styles.inputField} 
                selected={endDate} 
                onChange={date => setEndDate(date)} 
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
        </div>

        <form onSubmit={handleBooking}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Full Name</label>
                <input 
                    type="text" 
                    id="name" 
                    className={styles.inputField} 
                    required 
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    className={styles.inputField} 
                    required 
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, email: e.target.value }))}
                />
            </div>
            {/* Additional form fields can go here */}
            <button type="submit" className={styles.submitButton}>Confirm Booking</button>
        </form>
    </div>
  );
};

export default Checkout;
