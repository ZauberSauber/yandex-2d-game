import './index.css';

import ReactDOMServer from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { ServerStyleSheet } from 'styled-components';
import type { Request as ExpressRequest } from 'express';
import type { HelmetServerState } from 'react-helmet-async';

import { setPageHasBeenInitializedOnServer } from '@slices';

import { createContext, createFetchRequest, createUrl } from './entry-server.utils';
import { routes } from './routes';
import { reducer } from './store';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw context;
  }

  const store = configureStore({ reducer });

  const url = createUrl(req);
  const foundRoutes = matchRoutes(routes, url);
  if (!foundRoutes) {
    throw new Error('Страница не найдена!');
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes;

  try {
    if (typeof fetchData === 'function') {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
        ctx: createContext(req),
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Инициализация страницы произошла с ошибкой', e);
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true));

  const router = createStaticRouter(dataRoutes, context);
  const sheet = new ServerStyleSheet();

  const helmetContext: { helmet?: HelmetServerState } = {};

  try {
    const html = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <HelmetProvider context={helmetContext}>
          <Provider store={store}>
            <StaticRouterProvider router={router} context={context} />
          </Provider>
        </HelmetProvider>
      )
    );

    const styleTags = sheet.getStyleTags();

    // Забираем собранные теги из контекста (замена Helmet.renderStatic())
    const helmet = helmetContext.helmet;
    const head = {
      htmlAttributes: helmet?.htmlAttributes.toString() ?? '',
      bodyAttributes: helmet?.bodyAttributes.toString() ?? '',
      title: helmet?.title.toString() ?? '',
      meta: helmet?.meta.toString() ?? '',
      link: helmet?.link.toString() ?? '',
      script: helmet?.script?.toString?.() ?? '',
      noscript: helmet?.noscript?.toString?.() ?? '',
      style: helmet?.style?.toString?.() ?? '',
    };

    return {
      html,
      head,
      styleTags,
      initialState: store.getState(),
    };
  } finally {
    sheet.seal();
  }
};
