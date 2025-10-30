import { getSrc } from '@src/utils/helpers';

import style from './CircleAvatar.module.scss';

import photo from '/img/defaultAvatar.jpg';

interface CircleAvatarProps {
  srcAvatar: string;
  sizeImg: string;
  onClick?: () => void;
}

export const CircleAvatar = ({ srcAvatar, sizeImg, onClick }: CircleAvatarProps) => (
  <div className={style.avatar} onClick={onClick}>
    <img src={getSrc(srcAvatar) || photo} style={{ width: sizeImg, height: sizeImg }} />
  </div>
);
