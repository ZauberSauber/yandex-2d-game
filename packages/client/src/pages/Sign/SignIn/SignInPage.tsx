import { useCallback, useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import type { FormEvent } from 'react';

import { ButtonComponent } from '../../../components/Button/Button';
import { FormField } from '../../../components/FormField';
import { InputComponent } from '../../../components/Input';
import {
  FORM_IDS,
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_SUBMIT_DELAY,
} from '../../../constants/forms';
import type { LoginFormData } from '../../../types/forms';

import styles from './SignInPage.module.scss';

export const SignInPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    login: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Добавить логику авторизации
    console.log('Login data:', formData);

    setTimeout(() => {
      setIsLoading(false);
    }, FORM_SUBMIT_DELAY);
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
            <a href="/sign-up" className={styles['neon-link']} aria-label="Перейти к регистрации">
              Регистрация
            </a>
          </div>
        </form>
      </section>
    </main>
  );
};
