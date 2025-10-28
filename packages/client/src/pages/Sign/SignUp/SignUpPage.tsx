import { useCallback, useState } from 'react';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
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
import type { SignUpFormData } from '../../../types/forms';

import styles from './SignUpPage.module.scss';

export const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
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

    // TODO: Добавить логику регистрации
    console.log('Registration data:', formData);

    setTimeout(() => {
      setIsLoading(false);
    }, FORM_SUBMIT_DELAY);
  };

  return (
    <main className={styles['signup-page']}>
      <section className={styles['signup-container']}>
        <header className={styles['signup-header']}>
          <h1 className={styles['signup-title']} data-text="РЕГИСТРАЦИЯ">
            РЕГИСТРАЦИЯ
          </h1>
          <p className={styles['signup-subtitle']}>СОЗДАНИЕ НОВОГО АККАУНТА</p>
        </header>

        <form
          className={styles.form}
          id={FORM_IDS.SIGNUP}
          onSubmit={handleSubmit}
          aria-label="Форма регистрации">
          <FormField id="first_name" label={FORM_LABELS.FIRST_NAME} required>
            <InputComponent
              id="first_name"
              name="first_name"
              type="text"
              placeholder={FORM_PLACEHOLDERS.FIRST_NAME}
              required
              prefix={<UserOutlined />}
              value={formData.first_name}
              onChange={handleInputChange}
              aria-describedby="first_name-help"
            />
          </FormField>

          <FormField id="second_name" label={FORM_LABELS.SECOND_NAME} required>
            <InputComponent
              id="second_name"
              name="second_name"
              type="text"
              placeholder={FORM_PLACEHOLDERS.SECOND_NAME}
              required
              prefix={<UserOutlined />}
              value={formData.second_name}
              onChange={handleInputChange}
              aria-describedby="second_name-help"
            />
          </FormField>

          <FormField id="login" label={FORM_LABELS.LOGIN} required>
            <InputComponent
              id="login"
              name="login"
              type="text"
              placeholder={FORM_PLACEHOLDERS.LOGIN_SIGNUP}
              required
              prefix={<UserOutlined />}
              value={formData.login}
              onChange={handleInputChange}
              aria-describedby="login-help"
            />
          </FormField>

          <FormField id="email" label={FORM_LABELS.EMAIL} required>
            <InputComponent
              id="email"
              name="email"
              type="email"
              placeholder={FORM_PLACEHOLDERS.EMAIL}
              required
              prefix={<MailOutlined />}
              value={formData.email}
              onChange={handleInputChange}
              aria-describedby="email-help"
            />
          </FormField>

          <FormField id="password" label={FORM_LABELS.PASSWORD} required>
            <InputComponent
              id="password"
              name="password"
              type="password"
              placeholder={FORM_PLACEHOLDERS.PASSWORD_SIGNUP}
              required
              prefix={<LockOutlined />}
              value={formData.password}
              onChange={handleInputChange}
              aria-describedby="password-help"
            />
          </FormField>

          <FormField id="phone" label={FORM_LABELS.PHONE} required>
            <InputComponent
              id="phone"
              name="phone"
              type="tel"
              placeholder={FORM_PLACEHOLDERS.PHONE}
              required
              prefix={<PhoneOutlined />}
              value={formData.phone}
              onChange={handleInputChange}
              aria-describedby="phone-help"
            />
          </FormField>

          <div className={styles.form__actions}>
            <ButtonComponent
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              icon={<UserOutlined />}
              className={styles['neon-button']}
              aria-label="Создать новый аккаунт">
              СОЗДАТЬ АККАУНТ
            </ButtonComponent>
          </div>
        </form>

        <footer className={styles['signup-footer']}>
          УЖЕ ЕСТЬ АККАУНТ?
          <a href="/sign-in" className={styles['neon-link']} aria-label="Перейти к авторизации">
            ВОЙТИ
          </a>
        </footer>
      </section>
    </main>
  );
};
