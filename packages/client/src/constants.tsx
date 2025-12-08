import './client.d';

const isServer = typeof window === 'undefined';

export const SERVER_HOST = isServer ? __INTERNAL_SERVER_URL__ : __EXTERNAL_SERVER_URL__;
