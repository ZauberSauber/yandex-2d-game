import { useEffect } from 'react';

import { selectPageHasBeenInitializedOnServer, setPageHasBeenInitializedOnServer } from '@slices';

import { useDispatch, useSelector, useStore } from '../store';
import type { PageInitArgs, PageInitContext } from '../routes/types';

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
});

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>;
};

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch();
  const pageHasBeenInitializedOnServer = useSelector(selectPageHasBeenInitializedOnServer);
  const store = useStore();

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false));
      return;
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() });
  }, [dispatch, initPage, pageHasBeenInitializedOnServer, store]);
};
