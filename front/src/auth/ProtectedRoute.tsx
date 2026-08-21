import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';

// 로그인 필요 라우트 보호
const ProtectedRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
