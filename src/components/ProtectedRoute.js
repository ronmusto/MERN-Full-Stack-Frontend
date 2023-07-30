import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext); // Add isLoading here
  const navigate = useNavigate();

  // Logging user status
  console.log('Rendering ProtectedRoute, user is', user, ', isLoading is', isLoading);

  useEffect(() => {
    console.log("User in ProtectedRoute:", user); // This line should be inside useEffect
    if (!user && !isLoading) { // Only navigate if isLoading is also false
      navigate('/');
    }
  }, [user, navigate, isLoading]); // Add isLoading to the dependency array

  if (isLoading) {
    return <div>Loading...</div>; // Or return a loading spinner, or null, etc.
  }

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

