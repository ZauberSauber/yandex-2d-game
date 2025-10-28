import { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { checkAuthThunk, selectAuth } from '@src/slices/authSlice';
import { useDispatch, useSelector } from '@src/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector(selectAuth);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // Проверяем auth только один раз при монтировании
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      dispatch(checkAuthThunk());
    }
  }, [dispatch]);

  // Показываем загрузку во время проверки авторизации
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};
