import React from 'react';
import styles from '../CSS/Resume.module.css';

const Resume = () => {
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
        Highly motivated Computer Science graduate with expertise in software engineering, data analysis, and web development. Proven ability to quickly learn and excel in team-oriented environments.
      </p>
  
      {/* Skills and Experience */}
      <h2 className={styles.contactHeading}>Technical Skills</h2>
      <ul>
        <li>Programming Languages: JavaScript, Java, C++, HTML, CSS, Python, SQL, JSON, R</li>
        <li>Web Development: MongoDB, Express.js, React, Node.js</li>
        <li>Cloud Technologies: AWS, Docker, Google Cloud Platform</li>
        <li>Data Analysis & Visualization: Python, R, SQL, Tableau, PowerBI</li>
        <li>Machine Learning & AI: Keras, TensorFlow</li>
        <li>Other: Agile, Unit Testing, RESTful APIs, Git, Version Control, SSL, Debugging, ETL</li>
      </ul>
  
      {/* Education */}
      <h2 className={styles.contactHeading}>Education</h2>
      <p className={styles.contactDetails}>
        Master of Science in Computer Science (Expected: October 2025)
        <br />
        Merrimack College, North Andover, MA (Current GPA: 4.00)
      </p>
      <p className={styles.contactDetails}>
        Bachelor of Science in Computer Science (Awarded: July 2023)
        <br />
        Southern New Hampshire University, Manchester, NH (Summa Cum Laude, GPA: 3.94)
      </p>
  
      {/* Certifications */}
      <h2 className={styles.contactHeading}>Certifications</h2>
      <p className={styles.contactDetails}>
        Google IT Support Professional Certificate (Awarded: October 2019)
      </p>
  
      {/* Personal Projects */}
      <h2 className={styles.contactHeading}>Personal Projects</h2>
      <ul>
        <li>
          Full-stack web application with AWS, React, Node.js, and Express.js, featuring mobile responsiveness and an interactive data analysis tool.
        </li>
        <li>
          Simulated travel site built with RESTful APIs.
        </li>
      </ul>
  
      {/* Academic Projects */}
      <h2 className={styles.contactHeading}>Academic Projects</h2>
      <p className={styles.contactDetails}>
        Full-stack website with Angular, MongoDB, Node.js, and Express, as well as a mobile application. Explore all projects on my GitHub repository.
      </p>
  
      {/* Contact */}
      <h2 className={styles.contactHeading}>Contact Me</h2>
      <p className={styles.contactDetails}>
        Email: renaldomusto@gmail.com
        <br />
        Phone: 781-600-2716
        <br />
        LinkedIn: <a href="https://www.linkedin.com/in/renaldo-musto/" target="_blank">LinkedIn Profile</a>
        <br />
        Portfolio: <a href="https://www.renaldomusto.com" target="_blank">renaldomusto.com</a>
        <br />
        GitHub: <a href="https://github.com/ronmusto" target="_blank">GitHub Profile</a>
      </p>
    </div>
  );
};

export default Resume; 
