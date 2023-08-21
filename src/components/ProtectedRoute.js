import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) { // Only navigate if isLoading is also false
      navigate('/');
    }
  }, [user, navigate, isLoading]); // Add isLoading to the dependency array

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

