import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.module.css';

const Home = () => {
    return <h1>Home</h1>;
};

function App() {
  const navigate = useNavigate();
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
      if (data.user) {
        navigate('/AI');
      }
    })
    .catch(err => console.error('Error logging in:', err));
  };
  
  
  
  return (
    <div className="App">
      <Home /> {/* Incorporating the Home component here */}
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
          {/* User's password should not be displayed for security reasons */}
        </div>
      )}
    </div>
  );
}

export default App; // exporting App component
