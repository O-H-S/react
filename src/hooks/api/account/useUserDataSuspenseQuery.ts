import type { AxiosError } from 'axios';
import type { UserData } from '@type/user';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserData } from '@api/user/getUserData';

import { useSetRecoilState } from 'recoil';
import { loggedIn } from '@store/auth';

export const useUserDataSuspenseQuery = (userId : string = 'me') => {
  const setLoggedIn = useSetRecoilState(loggedIn);
  const { data: userData } = useSuspenseQuery<UserData, AxiosError>({
  
    queryKey: ['userData', userId],
    queryFn: () => {
      return getUserData(userId)
    },
    gcTime: 5 * 60 * 1000, // 쿼리 데이터가 캐시에서 삭제되기까지의 시간
    staleTime: 2 * 60 * 1000,
    retry : false, // 실패시 재시도할 횟수.
  });
  
  if(userData && userId === 'me'){
    setLoggedIn(true);
  }

  return { userData };
};

