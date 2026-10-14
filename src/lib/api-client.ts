import Axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { env } from '@/config/env';
import { eventBus } from '@/utils/event-bus.utils';

const AUTH_COOKIE_NAME = 'better-auth.session_token';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
  formSerializer: {
    visitor(value, key, path, helpers) {
      if (value === null || value === undefined) {
        return true;
      }

      return helpers.defaultVisitor.call(this, value, key, path, helpers);
    },
  },
  paramsSerializer: {
    indexes: null,
  },
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      Cookies.remove(AUTH_COOKIE_NAME);
      eventBus.emit('auth:unauthorized');
    }

    return Promise.reject(error);
  }
);
