import axios, {AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { HTTPError } from './HTTPError';


declare module 'axios' {
  export interface AxiosRequestConfig {
    useForm?: boolean;
    handleAuthHeader?:boolean;
  }
}


const Instance = axios.create({
   //baseURL: 'https://ohs.kr',
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    withCredentials: true, // 쿠키, HTTP 인증 정보 및 TLS 클라이언트 인증서 등을 포함

  });



// 요청 인터셉터
Instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
   if(typeof config.handleAuthHeader === 'undefined')
      config.handleAuthHeader = true;

    if (config.useForm && config.data && typeof config.data === 'object') {
      const formData = new URLSearchParams();
      Object.keys(config.data).forEach(key => {
          formData.append(key, config.data[key]);
      });
      config.data = formData;
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  }
);
/*
function handleAuthHeader(response: AxiosResponse) {
  const config: AxiosRequestConfig = response.config;

  if (config.handleAuthHeader) {
    const authHeader = response.headers['x-authenticated'];
    if (authHeader !== undefined) {
      const isAuthenticated = authHeader === 'true';
      setLoggedInState(isAuthenticated);
    }
  }
}
*/





export {Instance};