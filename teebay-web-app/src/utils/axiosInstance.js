import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if we should refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
    //   try {
    //     const authService = new AuthService(); // Ensure AuthService has a method to refresh token
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     const { accessToken } = await authService.refreshToken(refreshToken);
        
    //     localStorage.setItem('access_token', accessToken);
        
    //     // Now set the header on the original request and retry it
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    //     return axiosInstance(originalRequest);
    //   } catch (e) {
    //     return Promise.reject(e);
    //   }
    }

    // If not a 401 error or already retried, just reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
