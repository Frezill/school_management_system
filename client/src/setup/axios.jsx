import axios from 'axios'
import { toast } from 'react-toastify'


// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:1507/api/v1'
});

instance.defaults.withCredentials = true;

// // Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    switch (status) {
        //authentication (token related issues)
        case 401: {
            toast.error('Login to continue')
            // window.location.href = '/login'
            return error.response.data;
        }
        //forbidden (pemission related issues)
        case 403: {
            // toast.error(`You don't have permission to access this resoure...`);
            return error.response.data;
        }
        //not found
        case 404: {
            // toast.error(`This function is not available now`);
            return error.response.data;
        }
        case 405: {
            return error.response.data;
        }
        //bad request
        case 400: {
            return Promise.reject(error);
        }
        //conflict
        case 409: {
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
});

export default instance;