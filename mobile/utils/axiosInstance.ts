import axios, { AxiosInstance } from 'axios';
import { API_BASE } from '@env'

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE,
    responseType: 'json',
    withCredentials: true
});

export default axiosInstance