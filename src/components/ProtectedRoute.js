// ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContex';  // Import your UserContext

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return user ? children : <Navigate to="/" state={{ from: location }} />;
}

export default ProtectedRoute;
