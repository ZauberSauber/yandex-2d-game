import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { registerServiceWorker } from '@utils';

import { App } from './App';
import { createStore } from './store';

registerServiceWorker();

const preloadedState = window.APP_INITIAL_STATE;
const store = createStore(preloadedState);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
);
