import type { AxiosError } from 'axios';
import type { UserData } from '@type/user';

import {useQuery } from '@tanstack/react-query';
import { getUserData } from '@api/user/getUserData';

import { useSetRecoilState } from 'recoil';
import { loggedIn } from '@store/auth';
import { useEffect } from 'react';

export const useUserDataQuery = (userId : string = 'me') => {
  const setLoggedIn = useSetRecoilState(loggedIn);
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery<UserData, AxiosError>({
    queryKey: ['userData', userId],
    queryFn: () => getUserData(userId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Disable retries
    throwOnError:false,
  });

  
  useEffect(() => {
    if (userData && userId === 'me') {
      setLoggedIn(true);
    }
  }, [userData, userId, setLoggedIn]);

  return {
    userData,
    isLoading,
    isError,
    error,
  };
};

