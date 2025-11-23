import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import type { ReactElement } from 'react';

import { Spinner } from '@components/Spinner';
import { checkAuthThunk, selectAuth } from '@src/slices/authSlice';
import { useDispatch, useSelector } from '@src/store';

import styles from './ProtectedRoute.module.scss';

interface ProtectedRouteProps {
  children?: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector(selectAuth);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      dispatch(checkAuthThunk());
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles['loader-container']}>
        <Spinner />
      </div>
    );
  }

  if (typeof window === 'undefined') {
    return null; // SSR
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
