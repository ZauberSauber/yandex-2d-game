import type { PageInitArgs } from '@src/routes';

import { fetchUserThunk, selectUser } from '@slices';

export const initMainPage = async ({ dispatch, state }: PageInitArgs): Promise<void> => {
  if (!selectUser(state)) {
    return void (await dispatch(fetchUserThunk()));
  }
};
