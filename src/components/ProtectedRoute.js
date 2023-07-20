import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContex';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
