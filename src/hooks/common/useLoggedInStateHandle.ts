import { useSetRecoilState } from 'recoil';
import { loggedIn } from '@/store/auth';
import { Instance } from '@/api/instance';
import { useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';


export const useLoggedInStateHandle = () => {
  const setLoggedInState = useSetRecoilState(loggedIn);

  const authHeaderHandler = (response:any) => {
    const config: AxiosRequestConfig = response.config;
  
    if (config.handleAuthHeader) {
      const authHeader = response.headers['X-Authenticated'];
      if (authHeader !== undefined) {
        const isAuthenticated = authHeader === 'true';
        setLoggedInState(isAuthenticated);
      }
    }
  }

  

  useEffect(() => {
    const responseInterceptor = Instance.interceptors.response.use(
      (response) => {
        if(response){
          authHeaderHandler(response);
        }
        return response;
      },
      (error) => {
          if(error.response)
              authHeaderHandler(error.response);
          return Promise.reject(error);
  
      },
    );
  

    return () => {
      Instance.interceptors.response.eject(responseInterceptor);
    };
  }, [authHeaderHandler]);
};