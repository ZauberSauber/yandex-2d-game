import photo from '../../../public/img/defaultAvatar.jpg';

import style from './CircleAvatar.module.scss';

interface CircleAvatarProps {
  srcAvatar: string;
  sizeImg: string;
  onClick?: () => void;
}

export const CircleAvatar = ({ srcAvatar, sizeImg, onClick }: CircleAvatarProps) => (
  <div className={style.avatar} onClick={onClick}>
    <img src={srcAvatar || photo} style={{ width: sizeImg, height: sizeImg }} />
  </div>
);
