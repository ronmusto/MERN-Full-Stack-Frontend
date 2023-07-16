import React from 'react';
import './Resume.css';

const Resume = () => {
  return (
    <div>
      <h1>Resume</h1>

      <section>
        <h2>Renaldo Musto</h2>
        <p>B.S. in Computer Science, Concentration in Data Analytics</p>
        <p>(781)-600-2716 | renaldomusto@gmail.com</p>
      </section>

      <section>
        <h2>Education</h2>
        <p>Southern New Hampshire University</p>
        <p>B.S. in Computer Science with a Concentration in Data Analytics, July 2023</p>
        <p>Summa Cum Laude, Cumulative GPA: 3.94</p>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <ul>
          <li>Programming Languages: JavaScript, Java, C++, SQL, R, Python, Typescript, HTML & CSS</li>
          <li>Full Stack Development: MEAN Stack (MongoDB, Express, Angular, Node.js)</li>
          <li>Cloud Deployment: AWS (API Gateway, Lambda, DynamoDB, S3)</li>
          <li>Proficient in containerization particularly with Docker</li>
          <li>Machine Learning and AI: Familiar with Keras, TensorFlow</li>
          <li>Data Analysis: Experience with advanced statistical analysis, modeling, and sampling methods</li>
          <li>Software Security: Proficiency in dependency checks during static testing and manual code reviews</li>
          <li>Development Environments: VS Code, Android Studio, Eclipse, Jupyter Notebooks, MatLab, RStudio, Excel</li>
        </ul>
      </section>

      <section>
        <h2>Additional Skills</h2>
        <ul>
          <li>Proficient in version control using Git</li>
          <li>Proficient in using command line for various purposes</li>
          <li>Strong knowledge of common data structures and algorithms</li>
          <li>Familiarity with Agile development methodologies</li>
          <li>Experience in Client/Server Development and RESTful API</li>
        </ul>
      </section>
    </div>
  );
};

export default Resume;