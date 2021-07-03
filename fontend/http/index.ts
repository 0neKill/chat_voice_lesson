import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export const $api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
})

type IAuthInterceptors<T> = (config: T) => T;
const InterceptorRequest: IAuthInterceptors<AxiosRequestConfig> = (config) => {
    // config.headers.authorization = `Bearer ${window.localStorage.getItem('token')}`;// В next не работает ,если мы хотим получить страницу с SSR,Нужно доставать из кук
    return config
}

// $api.interceptors.request.use(InterceptorRequest);


