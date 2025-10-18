import { Typography } from 'antd';

import style from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const { Text } = Typography;
  return (
    <div className={style.container}>
      Profile Page123
      <div>
        <Text> avatar</Text>

        <div></div>
      </div>
    </div>
  );
};
