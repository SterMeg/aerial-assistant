import axios from 'axios'
import { getToken } from './tokenService'

axios.interceptors.request.use(function (config) {
    console.log('interceptor running')
    const token = getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})