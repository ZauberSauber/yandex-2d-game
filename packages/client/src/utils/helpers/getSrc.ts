import { BASE_URLS } from '../api/api';

export const getSrc = (path: string) => {
  if (!path) {
    return '';
  }

  if (path.includes('base64')) {
    return path;
  }

  return `${BASE_URLS.RESOURCES}${path}`;
};
