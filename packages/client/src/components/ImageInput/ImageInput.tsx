import { useRef } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import cn from 'classnames';

import { Spinner } from '../Spinner';

import style from './ImageInput.module.scss';

const getSrc = (path: string) => {
  if (!path) {
    return '';
  }

  return path;
  //TODO: расскоментировать после реализации авторизации и получения информации об пользователе
  // return `https:${BASE_URLS.RESOURCES}${path.replace('/', '')}`;
};

interface ImageInputProps {
  rawPathImg: string;
  error?: string;
  disabled?: boolean;
  downloadImgPending?: boolean;
  onChangeSrcAvatar: (value: string) => void;
  onChangeFileAvatar: (value: File) => void;
}

export const ImageInput = ({
  rawPathImg,
  error,
  disabled,
  downloadImgPending,
  onChangeSrcAvatar,
  onChangeFileAvatar,
}: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const src = getSrc(rawPathImg);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileImg = e.target.files?.[0];
    if (!fileImg) return;

    const reader = new FileReader();

    reader.onload = () => {
      onChangeSrcAvatar(reader.result as string);
      onChangeFileAvatar(fileImg);
    };
    reader.readAsDataURL(fileImg);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (src && e.target !== inputRef.current) {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onChangeSrcAvatar('');
    }
  };

  const handleLabelClick = () => {
    if (disabled) return;
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      {!downloadImgPending && (
        <Flex justify="center">
          <div className={cn(style['image-downloader-container'], error && style.error)}>
            {src && (
              <div
                className={cn(style['icon-button'], disabled && style.disabled)}
                onClick={onClick}>
                <CloseOutlined />
              </div>
            )}
            <div className={style.label} onClick={handleLabelClick}>
              {!src && <PlusOutlined />}
              {src && <img className={cn(style.img, disabled && style.disabled)} src={src} />}
              <input
                className={style.input}
                type="file"
                ref={inputRef}
                accept="image/*"
                onChange={handleImgChange}
                disabled={disabled}
              />
            </div>
          </div>
          {error && error}
        </Flex>
      )}
      {downloadImgPending && <Spinner title={'Загрузка'} />}
    </>
  );
};
