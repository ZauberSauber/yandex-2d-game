export const REDIRECT_URI = 'http://localhost:3000/oauth';

export const YANDEX_OAUTH_URL = 'https://oauth.yandex.ru/authorize';

export const getOAuthUrl = (serviceId: string): string =>
  `${YANDEX_OAUTH_URL}?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`;
