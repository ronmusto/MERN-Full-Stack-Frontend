import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import styles from '../CSS/Home.module.css';
import { UserContext } from '../components/UserContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Travel from '../pages/Travel';

export function useHomeLogic() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [regUsername, setRegUsername] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/verify`, {
          method: 'GET',
          credentials: 'include',  // include credentials to send the cookies
        })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        })
        .catch(err => {
          console.error('Error verifying token:', err);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);  // set isLoading to false once the request is complete
        });
      }, [setUser]);
      
    
      const handleLogin = e => {
        e.preventDefault();
      
        fetch(`${process.env.REACT_APP_BACKEND}/login`, {
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
              navigate('/travel');
            }
          })
          .catch(err => console.error('Error logging in:', err));
      };
      
      const handleRegister = e => {
        e.preventDefault();
    
        // Validate inputs
        if (!regEmail || !regUsername || !regPassword) {
          alert('All fields are required');
        return;
        }
      
        fetch(`${process.env.REACT_APP_BACKEND}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: regEmail, username: regUsername, password: regPassword }),
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => {
            setUser(data.user);
          })
          .catch(err => console.error('Error registering:', err));
      };
    
      const handleLogout = async () => {
        try {
          // Make API call to logout endpoint to clear cookie
          const response = await fetch(process.env.REACT_APP_BACKEND, {
            method: 'POST',
          });
      
          if (response.ok) {
            // Clear local storage
            localStorage.clear();
            
            // Update context to set user to null
            setUser(null);
          } else {
            console.error('Failed to log out');
          }
        } catch (error) {
          console.error('An error occurred during logout:', error);
        }
      };    

    return {
        navigate,
        user,
        setUser,
        regEmail,
        setRegEmail,
        regPassword,
        setRegPassword,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        isLoading,
        setIsLoading,
        regUsername,
        setRegUsername,
        handleLogin,
        handleRegister,
        handleLogout
    };
}