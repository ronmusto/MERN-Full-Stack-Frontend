import React, { useState, useContext } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import styles from './Home.module.css';
import { UserContext } from '../UserContex';
import ProtectedRoute from '../components/ProtectedRoute';
import AI from './AI';

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Use context here
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:4200/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: regEmail, password: regPassword }),
      credentials: 'include'  // include credentials
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
      })
      .catch(err => console.error('Error registering:', err));
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:4200/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      credentials: 'include'  // include credentials
    })
    .then(response => response.json())
    .then(data => {
      setUser(data.user);
      if (data.user) {
        navigate('/AI');
      }
    })
    .catch(err => console.error('Error logging in:', err));
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div className={styles.homeContainer}>
            {/* Login and registration forms */}
            <div className={styles.container}>
              <div className={styles.formContainer}>
                <h1 className={styles.registerHeading}>Register</h1>
                <form onSubmit={handleRegister}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                  />
                  <button type="submit">Register</button>
                </form>
              </div>
              <div className={styles.formContainer}>
                <h1 className={styles.loginHeading}>Login</h1>
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                  />
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
            {user && (
              <div className={styles.userContainer}>
                <h2>User</h2>
                <p>Email: {user.email}</p>
                {/* User's password should not be displayed for security reasons */}
              </div>
            )}
          </div>
        } />
        <Route path="/ai" element={
          <ProtectedRoute>
            <AI />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App; // exporting App component