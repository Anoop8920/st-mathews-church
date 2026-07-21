import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children, requiredRole = 'member' }) {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
