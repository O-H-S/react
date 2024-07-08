import type { AxiosError } from 'axios';
import type { UserData } from '@type/user';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getBoard } from '@/api/board/getBoard';

import { useSetRecoilState } from 'recoil';
import { loggedIn } from '@store/auth';
import { useEffect } from 'react';
import { BoardData } from '@/types/board';
import { GetUserNotificationsResponse, getUserNotifications } from '@/api/user/getUserNotifications';

export const useUserNotificationsQuery = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    // 리턴값으로 노출되는 함수를 통해 캐시에 대한 업데이트를 진행하므로, queryKey는 페이지 별로 지정하지 않아도 됨.
    queryKey: ['notifications'],

    // getNextPageParam 함수에서 반환된 값을 사용하여 다음 페이지의 데이터를 가져옴.
    queryFn: async ({ pageParam } : {pageParam:undefined|Date}) => {
      const result = await getUserNotifications(pageParam);
      return result;
    },
    //
    initialPageParam: undefined,
  
    // lastPage는 GetUserNotificationsResponse 객체이다.
    // 즉, GetUserNotificationsResponse는 nextCursor를 가지고 있어야함.
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor as Date ;
    },
    
  });

  return {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
