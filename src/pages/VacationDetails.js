import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../CSS/VacationDetails.module.css';

const VacationDetails = () => {
  const { id } = useParams(); // Get vacation ID from URL parameters
  const [vacation, setVacation] = useState(null);

  useEffect(() => {
    // Fetch vacation details from the API
    fetch(`https://website-backend-env.eba-6eqympxa.us-east-1.elasticbeanstalk.com/vacation/${id}`)
      .then((response) => response.json())
      .then((data) => setVacation(data))
      .catch((error) => console.error('Error fetching vacation:', error));
  }, [id]);

  if (!vacation) {
    return <div>Loading...</div>; // Loading indicator
  }

  // Split the images string into an array
  const imagesArray = vacation.images.split(';');

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.detailsHeading}>{vacation.destination}</h1>
      <div className={styles.detailsImages}>
        {imagesArray.map((image, index) => (
          <img key={index} src={`https://website-backend-env.eba-6eqympxa.us-east-1.elasticbeanstalk.com/images/${image}`} alt={vacation.destination} className={styles.detailsImage} />
        ))}
      </div>
      <p className={styles.detailsDescription}>{vacation.description}</p>
      <p className={styles.detailsPrice}>${vacation.price}</p>
      <Link to={`/checkout/${vacation._id}`} className={styles.bookNowButton}>Book Now</Link>
    </div>
  );
};

export default VacationDetails;