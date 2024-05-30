import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};
export const fetcherWithId = async (args: string | [string, string] |  [string, string, AxiosRequestConfig] ) => {
  const [url, id,  config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(`${url}/${id}`, { ...config });

  return res.data;
};

export const deleteWithId = async (args: string | [string, string] |  [string, string, AxiosRequestConfig] ) => {
  const [url, id,  config] = Array.isArray(args) ? args : [args];
  if (id) {
    const res = await axiosInstance.delete(`${url}/${id}`, { ...config });
    return res.data;
  }
  return null;
};


// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/profile',
    refer: '/referTo',
    login: '/adminLogin',
    forgotPassword: '/forgetPassword',
    resetPassword: '/resetPassword'
  },
  metrics : '/metrics',
  users : '/users',
  errors : '/errors',
};
