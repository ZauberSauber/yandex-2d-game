import { useCallback, useEffect, useState } from 'react';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { notification, Typography } from 'antd';
import cn from 'classnames';
import type { FormEvent } from 'react';

import { Button, FormField, InputComponent } from '@src/components';
import { CircleAvatar } from '@src/components/CircleAvatar';
import { ModalChangeAvatar } from '@src/components/ModalChangeAvatar';
import { Overlay } from '@src/components/Overlay';
import { Spinner } from '@src/components/Spinner';
import { TextAreaComponent } from '@src/components/TextArea';
import { FORM_LABELS_PROFILE_INFO, FORM_PLACEHOLDERS } from '@src/constants/forms';
import { logoutThunk } from '@src/slices/authSlice';
import {
  changePasswordThunk,
  clearError,
  getUserInfoThunk,
  selectProfileError,
  selectProfileLoading,
  selectUser,
  setProfileAvatarThunk,
  setUserInfoThunk,
} from '@src/slices/userSlice';
import { useDispatch, useSelector } from '@src/store';

import style from './ProfilePage.module.scss';

const DURATION_NOTIFY = 3;

export const ProfilePage = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUser);
  const profileError = useSelector(selectProfileError);
  const isProfileLoading = useSelector(selectProfileLoading);

  const [isOpenChangeAvatarModal, setIsOpenChangeAvatarModal] = useState(false);
  const [srcAvatar, setSrcAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [formDataProfieInfo, setFormDataProfieInfo] = useState({
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    biography: '',
  });

  const [formDataChangePassword, setFormDataChangePassword] = useState({
    old_password: '',
    new_password: '',
    repeat_new_password: '',
  });

  const handleInputChangeProfileInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setFormDataProfieInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleInputChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataChangePassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmitChangePassword = async (e: FormEvent) => {
    e.preventDefault();

    if (formDataChangePassword.new_password !== formDataChangePassword.repeat_new_password) {
      notification.error({
        message: 'Новый пароль не совпадает',
        duration: DURATION_NOTIFY,
        closable: true,
      });
      return;
    }

    dispatch(clearError());

    const result = await dispatch(
      changePasswordThunk({
        oldPassword: formDataChangePassword.old_password,
        newPassword: formDataChangePassword.new_password,
      })
    );

    if (changePasswordThunk.fulfilled.match(result)) {
      setFormDataChangePassword({ old_password: '', new_password: '', repeat_new_password: '' });

      notification.success({
        message: 'Пароль успешно изменён',
        duration: DURATION_NOTIFY,
        closable: true,
      });
    }
  };

  const handleSubmitProfileInfo = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(clearError());

    const result = await dispatch(setUserInfoThunk(formDataProfieInfo));

    if (setUserInfoThunk.fulfilled.match(result)) {
      notification.success({
        message: 'Данные успешно сохранены',
        duration: DURATION_NOTIFY,
        closable: true,
      });
    }
  };

  const handleSubmitAvatar = async (e: FormEvent) => {
    e.preventDefault();

    if (!avatarFile) return;
    const formImg = new FormData();
    formImg.append('avatar', avatarFile);

    const result = await dispatch(setProfileAvatarThunk(formImg));

    if (setProfileAvatarThunk.fulfilled.match(result)) {
      notification.success({
        message: 'Изображение успешно сохранено',
        duration: DURATION_NOTIFY,
        closable: true,
      });
      setIsOpenChangeAvatarModal(false);
    }
  };

  const onClickLogOut = () => {
    dispatch(logoutThunk());
  };

  useEffect(() => {
    if (userInfo) {
      setFormDataProfieInfo({
        first_name: userInfo.first_name,
        second_name: userInfo.second_name,
        display_name: userInfo.display_name,
        login: userInfo.login,
        email: userInfo.email,
        phone: userInfo.phone,
        biography: userInfo.biography,
      });

      setAvatarPreview(userInfo.avatar);
      setSrcAvatar(userInfo.avatar);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, [dispatch]);

  useEffect(() => {
    if (profileError) {
      notification.error({
        message: profileError,
        duration: DURATION_NOTIFY,
        closable: true,
      });
    }
  }, [profileError]);

  return (
    <div className={style.container}>
      <div>
        <div className={style['header-container']}>
          <div className={style['avatar-container']}>
            <CircleAvatar
              srcAvatar={avatarPreview}
              sizeImg="100"
              onClick={() => setIsOpenChangeAvatarModal(true)}
            />
          </div>
          <div className={style['description-container']}>
            <Title level={2} className={style['display-name']}>
              {userInfo?.display_name || 'Придумайте никнейм'}
            </Title>
            <div className={style.description}>
              <Text className={style.text}>{`Уровень: ${userInfo?.level} |
              Рейтинг: ${userInfo?.rating}`}</Text>
              <Text className={style.text}>{userInfo?.biography}</Text>
            </div>
          </div>
        </div>
        <div className={style['statistics-container']}>
          {userInfo?.statistics.map((statistic, index) => (
            <div key={index} className={style.statistic}>
              <Title level={3} className={style.count}>
                {statistic.value}
              </Title>
              <Text className={style.text}>{statistic.name}</Text>
            </div>
          ))}
        </div>
        <div className={style['info-container']}>
          <div className={style.info}>
            <Title level={3} className={style.title}>
              {'Настройки профиля'}
            </Title>
            <form className={style.content} onSubmit={handleSubmitProfileInfo}>
              <div className={style.data}>
                <FormField
                  id="first_name"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.FIRST_NAME}>
                  <InputComponent
                    id="first_name"
                    name="first_name"
                    type="text"
                    prefix={<UserOutlined />}
                    placeholder={FORM_PLACEHOLDERS.FIRST_NAME}
                    value={formDataProfieInfo.first_name}
                    onChange={handleInputChangeProfileInfo}
                    aria-describedby="first_name-help"
                  />
                </FormField>
              </div>
              <div className={style.data}>
                <FormField
                  id="second_name"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.SECOND_NAME}>
                  <InputComponent
                    id="second_name"
                    name="second_name"
                    type="text"
                    placeholder={FORM_PLACEHOLDERS.SECOND_NAME}
                    prefix={<UserOutlined />}
                    value={formDataProfieInfo.second_name}
                    onChange={handleInputChangeProfileInfo}
                    aria-describedby="second_name-help"
                  />
                </FormField>
              </div>
              <div className={style.data}>
                <FormField
                  id="display-name"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.DISPLAY_NAME}>
                  <InputComponent
                    id="display-name"
                    name="display_name"
                    type="text"
                    placeholder={FORM_PLACEHOLDERS.DISPLAY_NAME}
                    prefix={<UserOutlined />}
                    value={formDataProfieInfo.display_name}
                    onChange={handleInputChangeProfileInfo}
                    aria-describedby="display-name-help"
                  />
                </FormField>
              </div>
              <div className={style.data}>
                <FormField
                  id="login"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.LOGIN}>
                  <InputComponent
                    id="login"
                    name="login"
                    type="text"
                    placeholder={FORM_PLACEHOLDERS.LOGIN_SIGNUP}
                    prefix={<UserOutlined />}
                    value={formDataProfieInfo.login}
                    onChange={handleInputChangeProfileInfo}
                    aria-describedby="login-help"
                  />
                </FormField>
              </div>
              <div className={style.data}>
                <FormField
                  id="email"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.EMAIL}>
                  <InputComponent
                    id="email"
                    name="email"
                    type="email"
                    placeholder={FORM_PLACEHOLDERS.EMAIL}
                    prefix={<MailOutlined />}
                    value={formDataProfieInfo.email}
                    onChange={handleInputChangeProfileInfo}
                    aria-describedby="email-help"
                  />
                </FormField>
              </div>
              <div className={style.data}>
                <FormField
                  id="phone"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.PHONE}>
                  <InputComponent
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={FORM_PLACEHOLDERS.PHONE}
                    prefix={<PhoneOutlined />}
                    value={formDataProfieInfo.phone}
                    onChange={handleInputChangeProfileInfo}
                    aria-describedby="phone-help"
                  />
                </FormField>
              </div>

              <div className={style.data}>
                <Text className={style.label}> {FORM_LABELS_PROFILE_INFO.BIOGRAPHY}</Text>
                <TextAreaComponent
                  name="biography"
                  rows={4}
                  value={formDataProfieInfo.biography}
                  onChange={handleInputChangeProfileInfo}
                />
              </div>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isProfileLoading}
                icon={<UserOutlined />}>
                Сохранить изменения
              </Button>
            </form>
          </div>
          <div className={style.info}>
            <Title level={3} className={style.title}>
              Достижения
            </Title>
            <div className={cn(style.content, style['content-achivments'])}>
              {userInfo?.achivments.map((statistic, index) => (
                <div key={index} className={style.achivments}>
                  <Text className={style.title}>{statistic.name}</Text>
                  <Text className={style.text}>{statistic.description}</Text>
                </div>
              ))}
            </div>
          </div>
          <div className={style.info}>
            <Title level={3} className={style.title}>
              Безопасность
            </Title>
            <form className={style.content} onSubmit={handleSubmitChangePassword}>
              <div className={style.data}>
                <FormField
                  id="old-password"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.OLD_PASSWORD}
                  required>
                  <InputComponent
                    id="old-password"
                    name="old_password"
                    type="password"
                    placeholder={FORM_PLACEHOLDERS.PASSWORD_SIGNUP}
                    required
                    prefix={<LockOutlined />}
                    value={formDataChangePassword.old_password}
                    onChange={handleInputChangePassword}
                    aria-describedby="old-password-help"
                  />
                </FormField>
              </div>
              <div className={style.data}>
                <FormField
                  id="new-password"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.NEW_PASSWORD}
                  required>
                  <InputComponent
                    id="new-password"
                    name="new_password"
                    type="password"
                    placeholder={FORM_PLACEHOLDERS.PASSWORD_SIGNUP}
                    required
                    prefix={<LockOutlined />}
                    value={formDataChangePassword.new_password}
                    onChange={handleInputChangePassword}
                    aria-describedby="new-password-help"
                  />
                </FormField>
              </div>
              <div className={style.data}>
                <FormField
                  id="repeat-new-password"
                  className={style.field}
                  classNameLabel={style.label}
                  label={FORM_LABELS_PROFILE_INFO.REPEAT_NEW_PASSWORD}
                  required>
                  <InputComponent
                    id="repeat-new-password"
                    name="repeat_new_password"
                    type="password"
                    placeholder={FORM_PLACEHOLDERS.PASSWORD_SIGNUP}
                    required
                    prefix={<LockOutlined />}
                    value={formDataChangePassword.repeat_new_password}
                    onChange={handleInputChangePassword}
                    aria-describedby="repeat-new-password-help"
                  />
                </FormField>
              </div>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isProfileLoading}
                icon={<LockOutlined />}>
                Сменить пароль
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Button
        className={style['button-log-out']}
        type="primary"
        size="large"
        onClick={onClickLogOut}>
        Выйти
      </Button>

      {isProfileLoading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      {isOpenChangeAvatarModal && (
        <ModalChangeAvatar
          srcAvatar={srcAvatar}
          onChangeSrcAvatar={setSrcAvatar}
          onChangeFileAvatar={setAvatarFile}
          onClickSave={handleSubmitAvatar}
          onClickCancel={() => setIsOpenChangeAvatarModal(false)}
        />
      )}
    </div>
  );
};
