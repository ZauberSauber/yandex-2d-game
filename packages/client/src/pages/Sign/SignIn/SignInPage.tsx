import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { LoginOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import type { LoginFormData } from '@src/types/forms';
import type { FormEvent } from 'react';
import type { Location } from 'react-router';

import { Button } from '@components';
import { ButtonComponent } from '@components/Button/Button';
import { FormField } from '@components/FormField';
import { InputComponent } from '@components/Input';
import {
  clearError,
  getOAuthServiceIdThunk,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  signInThunk,
} from '@slices/authSlice';
import { FORM_IDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@src/constants/forms';
import { getOAuthUrl, REDIRECT_URI } from '@src/constants/oauth';
import { useTheme } from '@src/context';
import { useDispatch, useSelector } from '@src/store';

import styles from './SignInPage.module.scss';

export const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState<LoginFormData>({
    login: '',
    password: '',
  });

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

    dispatch(clearError());

    const result = await dispatch(signInThunk(formData));

    if (signInThunk.fulfilled.match(result)) {
      const from = (location.state as { from?: Location })?.from;
      navigate(from?.pathname || '/');
    }
  };

  const handleOAuthClick = useCallback(async () => {
    dispatch(clearError());

    const result = await dispatch(getOAuthServiceIdThunk(REDIRECT_URI));

    if (getOAuthServiceIdThunk.fulfilled.match(result)) {
      const serviceId = result.payload;
      const oauthUrl = getOAuthUrl(serviceId);
      window.location.href = oauthUrl;
    }
  }, [dispatch]);

  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <Flex gap="middle" justify="flex-end">
        <Button onClick={handleThemeToggle}>
          {isDarkTheme ? <MoonOutlined /> : <SunOutlined />}
        </Button>
      </Flex>
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

          <div className={styles['oauth-section']}>
            <div className={styles['oauth-divider']}>
              <span className={styles['oauth-divider-text']}>или</span>
            </div>
            <ButtonComponent
              type="default"
              size="large"
              onClick={handleOAuthClick}
              className={styles['oauth-button']}
              aria-label="Войти через Яндекс">
              <span className={styles['oauth-button-content']}>
                <span className={styles['oauth-logo']}>Я</span>
                <span className={styles['oauth-text']} data-text="Яндекс ID">
                  Яндекс ID
                </span>
              </span>
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
    </>
  );
};
