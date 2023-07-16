import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactHeading}>Contact Me</h1>
      <p className={styles.contactDetails}>Name: Renaldo Musto</p>
      <p className={styles.contactDetails}>Email: renaldomusto@gmail.com</p>
      <p className={styles.contactDetails}>Phone: 781-600-2716</p>
      <Link to="/resume" className={styles.contactButton}>
        View Resume
      </Link>
    </div>
  );
};

export default Contact;
