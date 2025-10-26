import { Button } from '../Button';
import { ImageInput } from '../ImageInput';

import style from './ModalChangeAvatar.module.scss';

interface ModalChangeAvatarProps {
  srcAvatar: string;
  onChangeSrcAvatar: (value: string) => void;
  onChangeFileAvatar: (value: FormData) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
}

export const ModalChangeAvatar = ({
  srcAvatar,
  onChangeSrcAvatar,
  onChangeFileAvatar,
  onClickSave,
  onClickCancel,
}: ModalChangeAvatarProps) => (
  <div className={style['modal-container']}>
    <form className={style.modal}>
      <ImageInput
        rawPathImg={srcAvatar}
        onChangeSrcAvatar={onChangeSrcAvatar}
        onChangeFileAvatar={onChangeFileAvatar}
      />
      <Button onClick={onClickSave}>Сохранить</Button>
      <Button onClick={onClickCancel}>Вернуться назад</Button>
    </form>
  </div>
);
