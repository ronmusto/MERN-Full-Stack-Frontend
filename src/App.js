import React, { useState } from 'react';
import './App.css';

function App() {
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://localhost:4200/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: regEmail, password: regPassword })
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
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
      })
      .catch(err => console.error('Error logging in:', err));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <h1 className="register-heading">Register</h1>
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
        <div className="form-container">
          <h1 className="login-heading">Login</h1>
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
        <div className="user-container">
          <h2>User</h2>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>
      )}
    </div>
  );
}

export default App;