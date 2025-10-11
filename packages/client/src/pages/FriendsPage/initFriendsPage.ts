import type { PageInitArgs } from '@src/routes';

import { fetchFriendsThunk, fetchUserThunk, selectUser } from '@slices';

export const initFriendsPage = ({ dispatch, state }: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = [dispatch(fetchFriendsThunk())];
  if (!selectUser(state)) {
    queue.push(dispatch(fetchUserThunk()));
  }
  return Promise.all(queue);
};
