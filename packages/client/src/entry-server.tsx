import ReactDOMServer from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import {
  createStaticHandler,
  createStaticRouter,
  matchRoutes,
  StaticRouterProvider,
} from 'react-router';
import { ConfigProvider } from 'antd';
import { ServerStyleSheet } from 'styled-components';
import type { AppRouteObject } from '@src/routes/types';
import type { Request as ExpressRequest } from 'express';
import type { HelmetServerState } from 'react-helmet-async';

import { setPageHasBeenInitializedOnServer } from '@slices';

import { createContext, createFetchRequest, createUrl } from './entry-server.utils';
import { routes } from './routes';
import { createStore } from './store';

import './styles/index.scss';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw context;
  }

  let store;
  try {
    console.info('[SSR] creating store...');
    store = createStore();
    console.info('[SSR] store created');
  } catch (e) {
    console.error('[SSR] ERROR in createStore():', e);
    throw e;
  }

  const url = createUrl(req);
  const foundRoutes = matchRoutes(routes, url);
  if (!foundRoutes) {
    throw new Error('Страница не найдена!');
  }

  const leafMatch = foundRoutes[foundRoutes.length - 1];
  const fetchData = (leafMatch.route as AppRouteObject).fetchData;

  try {
    if (typeof fetchData === 'function') {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
        ctx: createContext(req),
      });
      console.info('[SSR] store filled');
    }
  } catch (e) {
    console.error('Инициализация страницы произошла с ошибкой', e);
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true));

  const router = createStaticRouter(dataRoutes, context);
  const sheet = new ServerStyleSheet();

  const helmetContext: { helmet?: HelmetServerState } = {};

  try {
    const html = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <HelmetProvider context={helmetContext}>
          <ConfigProvider wave={{ disabled: true }}>
            <Provider store={store}>
              <StaticRouterProvider router={router} context={context} />
            </Provider>
          </ConfigProvider>
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
      helmet,
    };
  } finally {
    sheet.seal();
  }
};
