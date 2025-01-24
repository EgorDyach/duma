import axios, { AxiosError } from 'axios';
import { ENV } from '@lib/configs/enviorement';
import { ApiError, AppApi } from '@type/api';
import AppRoutes from '@lib/configs/routes';
import SessionService from '@lib/utils/sessionService';
import { showErrorNotification } from '@lib/utils/notification';

const defaultHeaders = {
    'Accept-Language': 'ru',
    'Content-type': 'application/json',
};

const createRequestInstance = (addAuthHeader: boolean): AppApi => {
    const instance = axios.create({
        baseURL: ENV.apiBaseUrl,
        headers: defaultHeaders,
    });

    if (addAuthHeader) {
        instance.interceptors.request.use((request) => {
            request.headers['Authorization'] =
                `Bearer ${SessionService.accessToken}`;
            return request;
        });
    }

    instance.interceptors.response.use(
        (response) => response.data,
        (error: AxiosError) => {
            if (error.status === 401) {
                SessionService.logout();
                window.location.pathname = AppRoutes.login;
                return;
            } else if (error.status === 500) {
                showErrorNotification('Сервер не доступен');
                return;
            }
            const errorObject = error.response?.data as ApiError | undefined;
            if (!!errorObject && typeof errorObject === 'object') {
                throw Object.fromEntries(
                    errorObject.errors.map((v) => [v.code, v.detail]),
                );
            }
            throw error.message;
        },
    );
    return instance as AppApi;
};

export const request = createRequestInstance(true);
export const noAuthRequest = createRequestInstance(false);
