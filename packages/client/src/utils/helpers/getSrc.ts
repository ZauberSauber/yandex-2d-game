import { BASE_URLS } from '../api/api';

export const getSrc = (path: string) => {
  if (!path) {
    return '';
  }

  return `https:${BASE_URLS.RESOURCES}${path.replace('/', '')}`;
};
