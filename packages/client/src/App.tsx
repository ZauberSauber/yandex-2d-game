import { createBrowserRouter, RouterProvider } from 'react-router';
import { ConfigProvider } from 'antd';

import { routes } from './routes';

const router = createBrowserRouter(routes);

export const App = () => (
  <ConfigProvider wave={{ disabled: true }}>
    <RouterProvider router={router} />
  </ConfigProvider>
);
