import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../CSS/Checkout.module.css';

const Checkout = () => {
  const { id } = useParams(); // Get vacation ID from URL parameters
  const [vacation, setVacation] = useState(null);
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    // Other booking details...
  });

  useEffect(() => {
    // Fetch vacation details from the API
    fetch(`http://localhost:4200/vacation/${id}`)
      .then((response) => response.json())
      .then((data) => setVacation(data))
      .catch((error) => console.error('Error fetching vacation:', error));
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    // Send booking details to the server...
    // Navigate to confirmation or user profile page...
    navigate('/account');
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

    <form>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">Full Name</label>
        <input type="text" id="name" className={styles.inputField} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input type="email" id="email" className={styles.inputField} required />
      </div>
      {/* Additional form fields can go here */}
      <a href={`/confirmation/${id}`} className={styles.submitButton}>Confirm Booking</a>
    </form>
  </div>
  );
};

export default Checkout;
