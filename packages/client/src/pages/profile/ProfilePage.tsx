import { useState } from 'react';
import { Input, Typography } from 'antd';
import cn from 'classnames';

import { profileApi } from '@src/api/profileApi';
import { Button } from '@src/components';
import { CircleAvatar } from '@src/components/CircleAvatar';
import { ModalChangeAvatar } from '@src/components/ModalChangeAvatar';
import { TextAreaComponent } from '@src/components/TextArea';

import { userMockData } from './MockData';

import style from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const { Title, Text } = Typography;

  //TODO: в рамках задачи по созданию хранилища в 6-ом спринте
  // здесь будут почищены useState
  const [isOpenChangeAvatarModal, setIsOpenChangeAvatarModal] = useState(false);
  const [srcAvatar, setSrcAvatar] = useState('');
  const [srcAvatarProfile, setSrcAvatarProfile] = useState('');
  const [srcSavedAvatar, setSrcSavedAvatar] = useState<FormData | null>(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const onClickChangePassword = () => {
    if (newPassword === repeatNewPassword) {
      profileApi.changePassword({ oldPassword, newPassword });
    }
  };

  return (
    <div className={style.container}>
      <div>
        <div className={style['header-container']}>
          <div className={style['avatar-container']}>
            <CircleAvatar
              srcAvatar={srcAvatarProfile}
              sizeImg="100"
              onClick={() => setIsOpenChangeAvatarModal(true)}
            />
          </div>
          <div className={style['description-container']}>
            <Title level={2} className={style['display-name']}>
              {userMockData.displayName}
            </Title>
            <div className={style.description}>
              <Text className={style.text}>{`Уровень: ${userMockData.level} |
              Рейтинг: ${userMockData.rating}`}</Text>
              <Text className={style.text}>{userMockData.biography}</Text>
            </div>
          </div>
        </div>
        <div className={style['statistics-container']}>
          {userMockData.statistics.map((statistic, index) => (
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
              Настройки профиля
            </Title>
            <form className={style.content}>
              <div className={style.data}>
                <Text className={style.label}> Имя</Text>
                <Input value={userMockData.firstName} />
              </div>
              <div className={style.data}>
                <Text className={style.label}> Фамилия</Text>
                <Input value={userMockData.secondName} />
              </div>
              <div className={style.data}>
                <Text className={style.label}> Никнейм</Text>
                <Input value={userMockData.displayName} />
              </div>
              <div className={style.data}>
                <Text className={style.label}> Логин</Text>
                <Input value={userMockData.login} />
              </div>
              <div className={style.data}>
                <Text className={style.label}> Email</Text>
                <Input value={userMockData.email} />
              </div>
              <div className={style.data}>
                <Text className={style.label}> Биография</Text>
                {/* <Input value={userMockData.biography} /> */}
                <TextAreaComponent value={userMockData.biography} />
              </div>
              <Button> Сохранить изменения</Button>
            </form>
          </div>
          <div className={style.info}>
            <Title level={3} className={style.title}>
              Достижения
            </Title>
            <div className={cn(style.content, style['content-achivments'])}>
              {userMockData.achivments.map((statistic, index) => (
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
            <form className={style.content}>
              <div className={style.data}>
                <Text className={style.label}> Текущий пароль</Text>
                <Input
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
              <div className={style.data}>
                <Text className={style.label}> Новый пароль</Text>
                <Input
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className={style.data}>
                <Text className={style.label}> Подтверждение пароля</Text>
                <Input
                  value={repeatNewPassword}
                  onChange={(e) => {
                    setRepeatNewPassword(e.target.value);
                  }}
                />
              </div>
              <Button onClick={onClickChangePassword}> Сменить пароль</Button>
            </form>
          </div>
        </div>
      </div>
      {isOpenChangeAvatarModal && (
        <ModalChangeAvatar
          srcAvatar={srcAvatar}
          onChangeSrcAvatar={setSrcAvatar}
          onChangeFileAvatar={setSrcSavedAvatar}
          onClickSave={() => {
            if (srcSavedAvatar) {
              profileApi.uploadAvatar(srcSavedAvatar);
            }

            setSrcAvatarProfile(srcAvatar);
            setIsOpenChangeAvatarModal(false);
          }}
          onClickCancel={() => setIsOpenChangeAvatarModal(false)}
        />
      )}
    </div>
  );
};
