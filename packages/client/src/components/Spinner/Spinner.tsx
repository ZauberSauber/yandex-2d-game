import style from './Spinner.module.scss';

type SpinnerProps = {
  title?: string;
};

export const Spinner = ({ title = '' }: SpinnerProps) => (
  <div className={style['spinner-wrapper']}>
    <div className={style.spinner} />
    <div className={style.title}>{title || 'Загрузка'}</div>
  </div>
);
