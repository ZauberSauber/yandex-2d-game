import axios, { HttpStatusCode, isAxiosError } from 'axios';

import { RequestMethods } from './types';

const isStringUrl = (value: unknown) => typeof value === 'string';

export const BASE_URLS = {
  API: 'https://ya-praktikum.tech/api/v2',
  RESOURCES: 'https://ya-praktikum.tech/api/v2/resources',
};

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  baseURL: BASE_URLS.API,
};

const axiosInstance = axios.create(axiosConfig);

type TUrlGenerator<Data> = (data: Data) => string;
type TFetchUrl<Data> = string | TUrlGenerator<Data>;

type TCustomShape = { [key: string]: unknown };

type TFetchConfig = <Data, Params>(
  data: Data,
  params: Params,
  signal?: AbortSignal
) => {
  method: RequestMethods;
  data?: TCustomShape;
  params?: TCustomShape;
  signal?: AbortSignal;
};

export type TRequestResult<Data> = {
  status: HttpStatusCode | null;
  error: boolean;
  data?: Data;
};

export const fetchTemplate =
  (getConfig: TFetchConfig) =>
  <RequestData, ResponseData>(url: TFetchUrl<RequestData | TCustomShape>) =>
  async (
    requestData: RequestData | TCustomShape = {},
    requestParams: TCustomShape = {},
    signal?: AbortSignal
  ): Promise<TRequestResult<ResponseData>> => {
    try {
      const finalUrl = isStringUrl(url) ? url : url(requestData);
      const result = await axiosInstance(finalUrl, getConfig(requestData, requestParams, signal));
      // response нету в 200, но есть в 400х
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      const { data, status } = result?.response || result || {};

      if (status === HttpStatusCode.Ok) {
        return { error: false, data, status };
      }

      return { error: true, data, status };
    } catch (error: unknown) {
      if (!isAxiosError(error)) {
        return { error: true, status: null };
      }

      const errorStatus = error?.response?.status ?? null;
      const errorData = error?.response?.data ?? null;

      return { error: true, data: errorData, status: errorStatus };
    }
  };

const generateFetch = (method: RequestMethods) =>
  fetchTemplate(
    <Data, Params, AbortSignal>(
      requestData?: Data,
      requestParams?: Params,
      signal?: AbortSignal
    ) => ({
      method,
      ...(requestData ? { data: requestData, params: requestParams || {}, signal } : {}),
    })
  );

export const API = {
  get: generateFetch(RequestMethods.GET),
  post: generateFetch(RequestMethods.POST),
  put: generateFetch(RequestMethods.PUT),
  delete: generateFetch(RequestMethods.DELETE),
  patch: generateFetch(RequestMethods.PATCH),
};
