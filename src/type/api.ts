import { AxiosRequestConfig } from 'axios';

type RequestMethods = 'get' | 'delete' | 'options' | 'head' | 'request';

type RequestMethodsWithData =
  | 'post'
  | 'put'
  | 'patch'
  | 'postForm'
  | 'putForm'
  | 'patchForm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestMethodsFn = <T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
) => Promise<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataRequestMethodsFn = <T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
) => Promise<T>;

export type AppApi = Record<RequestMethods, RequestMethodsFn> &
  Record<RequestMethodsWithData, DataRequestMethodsFn>;

export interface ErrorDetail {
  detail: string;
  code: string;
  attr: string;
}

// TODO: изменить обработку ошибок в проекте
export interface FormErrorResponse {
  message: string;
  code: number;
  details?: string;
  errors: ErrorDetail[];
}

export type ApiError = {
  errors: ErrorDetail[];
  type: string;
};

export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: T;
}

export type QueryParams = Record<string, string | number | boolean | unknown[]>;
