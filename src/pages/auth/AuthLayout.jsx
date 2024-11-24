import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthLayout;
