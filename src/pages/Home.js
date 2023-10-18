import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from '../CSS/Home.module.css';
import ProtectedRoute from '../components/ProtectedRoute';
import Travel from '../pages/Travel';
import { useHomeLogic } from '../components/HomeLogic';

function Home() {
  const {
    handleLogin,
    handleLogout,
    handleRegister,
    user,
    regEmail,
    setRegEmail,
    regPassword,
    setRegPassword,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    regUsername,
    setRegUsername,
  } = useHomeLogic();

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
                      type="username"
                      placeholder="Username"
                      value={regUsername}
                      onChange={e => setRegUsername(e.target.value)}
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
          path="/travel"
          element={
            <ProtectedRoute>
              <Travel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Home;