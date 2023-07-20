import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User in ProtectedRoute:", user); // This line should be inside useEffect
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
