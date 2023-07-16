import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div>
      <h1>Contact Me</h1>
      <p>Name: Renaldo Musto</p>
      <p>Email: renaldomusto@gmail.com</p>
      <p>Phone: 781-600-2716</p>
      <Link to="/resume">
        <button>View Resume</button>
      </Link>
    </div>
  );
};

export default Contact;