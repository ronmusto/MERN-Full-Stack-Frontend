import React from 'react';
import styles from '../CSS/Account.module.css';
import { DateTime } from 'luxon';


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
                            {/*<input 
                                type="date" 
                                defaultValue={DateTime.fromISO(vacation.startDate).toISODate()} // Format for date input
                                ref={startDateRef} 
                            />
                            <input 
                                type="date" 
                                defaultValue={DateTime.fromISO(vacation.endDate).toISODate()} // Format for date input
                                ref={endDateRef} 
                            />
                            <button onClick={() => {
                                const userTimeZone = DateTime.local().zoneName; // Get the user's timezone

                                // Get the original date and time from vacation.startDate and vacation.endDate
                                // Parse the date strings and set the time to midnight in the user's timezone
                                const newStartDate = DateTime.fromISO(newStartDate, { zone: userTimeZone }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toUTC().toISO();
                                const newEndDate = DateTime.fromISO(newEndDate, { zone: userTimeZone }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toUTC().toISO();

                                updateBookingDates(vacation._id, newStartDate, newEndDate, userTimeZone); 
                            }} className={styles.updateButton}>Update Dates</button>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountView;
