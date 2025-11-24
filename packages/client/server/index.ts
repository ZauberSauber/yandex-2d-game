import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import open from 'open';

import express, { Request as ExpressRequest } from 'express';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { createServer as createHttpServer } from 'http';
import serialize from 'serialize-javascript';
import type { HelmetServerState } from 'react-helmet-async';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = Number(process.env.CLIENT_PORT) || 3000;
const clientPath = path.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';

async function createServer() {
  const app = express();
  const httpServer = createHttpServer(app);

  app.use(cookieParser());

  let vite: ViteDevServer | undefined;

  if (isDev) {
    vite = await createViteServer({
      root: clientPath,
      appType: 'custom',
      server: { middlewareMode: true, hmr: { server: httpServer } },
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }));
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    if (
      url.startsWith('/sw.js') ||
      url.startsWith('/manifest.webmanifest') ||
      url.startsWith('/workbox-') ||
      url.startsWith('/.well-known/') // расширения
    ) {
      return next();
    }

    try {
      // Получаем файл client/index.html который мы правили ранее
      // Создаём переменные
      let render: (req: ExpressRequest) => Promise<{
        html: string;
        initialState: unknown;
        helmet: HelmetServerState;
        styleTags: string;
      }>;
      let template: string;

      if (vite) {
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template);

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render;
      } else {
        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8');

        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(clientPath, 'dist/server/entry-server.js');

        // Импортируем этот модуль и вызываем с инишл стейтом
        render = (await import(pathToServer)).render;
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState, helmet, styleTags } = await render(req);

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template
        .replace('<!--ssr-styles-->', styleTags)
        .replace(
          `<!--ssr-helmet-->`,
          `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`
        )
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        );

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  httpServer.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);

    if (isDev) open(`http://localhost:${port}`);
  });
}

createServer();
