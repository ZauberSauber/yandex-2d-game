import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import style from './Overlay.module.scss';

type OverlayProps = {
  onClick?: () => void;
  transparent?: boolean;
};

export const Overlay: FC<PropsWithChildren<OverlayProps>> = ({
  children,
  transparent,
  onClick,
}) => (
  <div
    role="button"
    className={cn(style.overlay, transparent && style.transparent)}
    onClick={onClick}>
    {children}
  </div>
);
