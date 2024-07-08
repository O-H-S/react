import { useSetRecoilState } from 'recoil';
import { loggedIn } from '@/store/auth';
import { Instance } from '@/api/instance';
import { useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HTTPError } from '@/api/HTTPError';

export const useApiResponseHandle = () => {
      useEffect(() => {

        const responseInterceptor = Instance.interceptors.response.use(
          response =>{
            //handleAuthHeader(response);
        
            console.log('응답을 성공적으로 받음:', response);
        
            return response;
          },
          error => {
            if (!error.response) 
            {
              console.log('응답 Axios 에러:', error);
              throw error;
            }
            //handleAuthHeader(error.response);
        
            
            // return Promise.reject(error);와 throw error 는 같은 동작
            //throw error;
            const { data, status } = error.response;
            if(data && data instanceof Object &&'code' in data )
            {
              console.log("처리된 백엔드 응답 error", error)
              throw new HTTPError(status, data.message, data.code, data.data);
              
            }
            console.log("처리되지 않은 백엔드 응답 error", error)
            throw new HTTPError(status, data.message);
            
          
            //throw new HTTPError(status, data.message, 24343);
            //return Promise.resolve({data:'sf'});
            
          }
        );


        return () => {
          Instance.interceptors.response.eject(responseInterceptor);
        };
      }, []);
    };