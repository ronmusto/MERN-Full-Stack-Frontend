import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import styles from './Home.module.css';
import { UserContext } from '../UserContext';
import ProtectedRoute from '../components/ProtectedRoute';
import AI from './AI';

function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Stored token:", token);

    if (token) {
      fetch('http://localhost:4200/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
            console.log("User after verification:", data.user);
          } else {
            setUser(null);
            localStorage.removeItem('token');
          }
        })
        .catch(err => {
          console.error('Error verifying token:', err);
          setUser(null);
          localStorage.removeItem('token');
        });
    } else {
      setUser(null);
    }
  }, [setUser]);

  const handleRegister = e => {
    e.preventDefault();

    fetch('http://localhost:4200/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: regEmail, password: regPassword }),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
        localStorage.setItem('token', data.token);
      })
      .catch(err => console.error('Error registering:', err));
  };

  const handleLogin = e => {
    e.preventDefault();

    fetch('http://localhost:4200/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
        if (data.user) {
          localStorage.setItem('token', data.token);
          navigate('/ai'); // Redirect to /ai page
        }
      })
      .catch(err => console.error('Error logging in:', err));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home page
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
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
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AI />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Home;
