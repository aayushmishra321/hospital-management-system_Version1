import axios from 'axios';

// Create a centralized Axios instance
export const api = axios.create({
    baseURL: 'http://localhost:5000/api', // This will point to our Express backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Automatically attach the JWT token if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('hms_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle global errors like expired tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized access - perhaps the token expired?');
            // In a real app, you might redirect to the login page here
            // localStorage.removeItem('hms_token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);