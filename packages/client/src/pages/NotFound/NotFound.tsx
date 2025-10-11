import { Helmet } from 'react-helmet-async';
import { usePage } from '@hooks';

import { Header } from '@components/Header';

import { initNotFoundPage } from './initNotFoundPage';

export const NotFoundPage = () => {
  usePage({ initPage: initNotFoundPage });

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <meta name="description" content="Страница не найдена" />
      </Helmet>
      <Header />
      Страница не найдена!
    </div>
  );
};
