import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import type { FormEvent } from 'react';
import type { Location } from 'react-router-dom';

import { ButtonComponent } from '../../../components/Button/Button';
import { FormField } from '../../../components/FormField';
import { InputComponent } from '../../../components/Input';
import { FORM_IDS, FORM_LABELS, FORM_PLACEHOLDERS } from '../../../constants/forms';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  clearError,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  signInThunk,
} from '../../../slices/authSlice';
import type { LoginFormData } from '../../../types/forms';

import styles from './SignInPage.module.scss';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState<LoginFormData>({
    login: '',
    password: '',
  });

  // Редирект если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: Location })?.from;
      navigate(from?.pathname || '/', { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Очищаем предыдущую ошибку
    dispatch(clearError());

    const result = await dispatch(signInThunk(formData));

    if (signInThunk.fulfilled.match(result)) {
      const from = (location.state as { from?: Location })?.from;
      navigate(from?.pathname || '/');
    }
  };

  return (
    <main className={styles['login-page']}>
      <section className={styles['login-container']}>
        <header className={styles['login-header']}>
          <h1 className={styles['login-title']} data-text="DISPLAYFLEXERS">
            DISPLAYFLEXERS
          </h1>
          <p className={styles['login-subtitle']}>АВТОРИЗАЦИЯ В СИСТЕМЕ</p>
        </header>

        <form
          className={styles['login-form']}
          id={FORM_IDS.LOGIN}
          onSubmit={handleSubmit}
          aria-label="Форма авторизации">
          {error && (
            <div className={styles['error-message']} role="alert">
              {error}
            </div>
          )}

          <FormField id="login" label={FORM_LABELS.LOGIN} required>
            <InputComponent
              id="login"
              name="login"
              type="text"
              placeholder={FORM_PLACEHOLDERS.LOGIN}
              required
              prefix={<LoginOutlined />}
              value={formData.login}
              onChange={handleInputChange}
              aria-describedby="login-help"
            />
          </FormField>

          <FormField id="password" label={FORM_LABELS.PASSWORD} required>
            <InputComponent
              id="password"
              name="password"
              type="password"
              placeholder={FORM_PLACEHOLDERS.PASSWORD}
              required
              prefix={<LoginOutlined />}
              value={formData.password}
              onChange={handleInputChange}
              aria-describedby="password-help"
            />
          </FormField>

          <div className={styles['form-actions']}>
            <ButtonComponent
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              icon={<LoginOutlined />}
              className={styles['login-button']}
              aria-label="Войти в систему">
              ВОЙТИ
            </ButtonComponent>
          </div>

          <div className={styles['login-links']}>
            <Link to="/sign-up" className={styles['neon-link']} aria-label="Перейти к регистрации">
              Регистрация
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};
