import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (
      !config.url.includes('/auth/2fa') &&
      !config.url.includes('/auth/refreshToken')
    ) {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        const errorMessage = data?.message || data?.error;

        if (errorMessage && errorMessage.includes('Token expired')) {
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const res = await axiosInstance.post('/auth/refreshToken', {
                refreshToken,
              });

              if (res.status === 200 && res.data?.accessToken) {
                const newAccessToken = res.data?.accessToken;
                localStorage.setItem('access_token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
              }
            }
          } catch (refreshError) {
            localStorage.clear();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else {
          return Promise.reject(error);
        }
      }

      if (status === 400) {
        return Promise.reject(error);
      }

      if (status === 404) {
        return Promise.reject(error);
      }

      if (status === 500) {
        return Promise.reject(error);
      }
    } else if (error.request) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
