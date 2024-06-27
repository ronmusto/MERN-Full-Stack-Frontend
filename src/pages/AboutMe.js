import React from 'react';
import '../CSS/AboutMe.module.css'; // Import your CSS file

function AboutMe() {
  return (
    <div>
      <header>
        <h1>About Me</h1>
      </header>

      <main>
        <section id="profile">
          <h2>Renaldo Musto</h2>
          <p>
          I'm a passionate software engineer with a specialization in data-driven solutions that 
          includes machine learning and other AI applications. 
          I enjoy building many kinds of programs from websites like this to mobile applications. 
          My current lead project involves developing this MERN stack website, which I successfully deployed on AWS, leveraging Google 
          Cloud APIs and MongoDB Atlas creating a network of cloud solutions. I'm eager to continue exploring the intersection of technology and data to create 
          innovative applications.</p>
        </section>

        <section id="interests">
  <h2>Interests</h2>
  <ul>
    <li>Data Analysis</li>
    <li>Machine Learning</li>
    <li>Web Development</li>
    <li>Cloud Deployment</li>
  </ul>
</section>

<section id="skills">
  <h2>Skills</h2>
  <ul>
    <li>JavaScript, HTML, CSS, Python, SQL, JSON, R</li> {/* Programming Languages */}
    <li>MongoDB, Express.js, React, Node.js</li> {/* Web Development */}
    <li>AWS, Docker, Google Cloud Platform</li> {/* Cloud Technologies */}
    <li>Python, R, SQL</li> {/* Data Analysis */}
    <li>Keras, TensorFlow</li> {/* Machine Learning */}
    <li>Agile methodologies, RESTful APIs, Git, Version Control</li> {/* Other */}
  </ul>
</section>

<section id="additional-skills"> {/* New section for additional skills */}
  <h2>Additional Skills</h2>
  <ul>
    <li>Backend Development</li>
    <li>API Integration (Google Cloud)</li>
    <li>Database Management (MongoDB Atlas)</li>
  </ul>
</section>


        <section id="contact">
          <h2>Contact</h2>
          <p>renaldomusto@gmail.com | 781-600-2716</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Renaldo Musto</p>
      </footer>
    </div>
  );
}

export default AboutMe;
