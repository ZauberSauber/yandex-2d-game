import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Spinner } from '@components/Spinner';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  signInWithOAuthThunk,
} from '@slices/authSlice';
import { REDIRECT_URI } from '@src/constants/oauth';
import { PATHS } from '@src/routes/constants';
import { useDispatch, useSelector } from '@src/store';

import styles from './OAuthCallbackPage.module.scss';

export const OAuthCallbackPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasProcessed = useRef(false);

  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.HOME, { replace: true });
      return;
    }

    if (hasProcessed.current || isLoading) {
      return;
    }

    const code = searchParams.get('code');

    if (code) {
      hasProcessed.current = true;
      setSearchParams({}, { replace: true });
      dispatch(
        signInWithOAuthThunk({
          code,
          redirect_uri: REDIRECT_URI,
        })
      );
    } else {
      navigate(PATHS.HOME, { replace: true });
    }
  }, [searchParams, navigate, dispatch, isLoading, isAuthenticated, setSearchParams]);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p className={styles['error-text']}>Ошибка авторизации: {error}</p>
          <button
            type="button"
            onClick={() => navigate(PATHS.SIGN_IN, { replace: true })}
            className={styles['error-button']}>
            Вернуться к входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Spinner title="Обработка авторизации..." />
    </div>
  );
};
