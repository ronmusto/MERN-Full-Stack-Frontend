import React from 'react';
import styles from '../CSS/Contact.module.css';

const Contact = () => {
  const projects = [
    {
      title: "Full-Stack Web Application",
      description: "A MERN stack application built to manage [describe functionality]",
      link: "https://[your_project_link]", // Replace with your actual project link
      image: "[image_url]", // Add an image URL for the project
    },
    // Add more projects in a similar format
  ];

  return (
    <div className={styles.contactContainer}>
      {/* Introduction */}
      <h1 className={styles.mainHeading}>Renaldo Musto</h1>
      <p className={styles.contactDetails}> 
        Passionate software engineer specializing in the MERN stack. I love building 
        full-stack web applications that solve real-world problems.
      </p>

      {/* Skills and Experience */}
      <h2 className={styles.contactHeading}>Skills & Experience</h2>
      <ul>
        <li>MERN Stack (MongoDB, Express, React, Node.js)</li>
        <li>Frontend Development (HTML, CSS, JavaScript)</li>
        <li>Backend Development (Node.js, Express)</li>
        <li>Database Design (MongoDB)</li>
        {/* ... add more skills as needed */}
      </ul>

      {/* Education and Certifications */}
      <h2 className={styles.contactHeading}>Education & Certifications</h2>
      <p className={styles.contactDetails}>
        Master of Science in Computer Science - Expected October 2025
      </p>
      <p className={styles.contactDetails}>
        Bachelor of Science in Computer Science - Awarded July 2023 
      </p>
      <p className={styles.contactDetails}>
        Google IT Support Professional Certificate
      </p>

      {/* Portfolio 
      <h2 className={styles.contactHeading}>Portfolio</h2>
      <div className={styles.portfolioContainer}> 
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <img src={project.image} alt={project.title} />
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
      */}
      {/* Contact */}
      <h2 className={styles.contactHeading}>Contact Me</h2>
      <p className={styles.contactDetails}>Email: renaldomusto@gmail.com</p>
      <p className={styles.contactDetails}>Phone: 781-600-2716</p> 
    </div>
  );
};

export default Contact; 
