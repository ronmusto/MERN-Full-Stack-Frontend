import React from 'react';
import styles from '../CSS/Account.module.css';

const AccountView = ({ userData, bookedVacations, deleteBooking, updateBookingDates, startDateRef, endDateRef }) => {
    return (
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
                                <img key={index} src={`${process.env.REACT_APP_BACKEND}/images/${img}`} alt={`Image ${index}`} />
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
    );
};

export default AccountView;
