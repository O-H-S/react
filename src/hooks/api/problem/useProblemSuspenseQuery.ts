import type { AxiosError } from 'axios';
import type { ProblemData } from '@/types/problem';


import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { getProblem } from '@/api/problem/getProblem';


export const useProblemSuspenseQuery = (id : number) :ProblemData   => {
    const queryClient = useQueryClient();
    const {data:problemData}  = useSuspenseQuery<ProblemData, AxiosError>({
    
      queryKey: ['problem', id],
      // queryFn이 받는 인자는 React Query에 의해 정해져 있고, 기본적으로 queryKey와 queryFnContext 두 가지를 포함하는 객체 형태로 제공
      queryFn: async () => {
        var result = await getProblem(id);
        return result;
      },
      gcTime: 5 * 60 * 1000, // 쿼리 데이터가 캐시에서 삭제되기까지의 시간
      staleTime: 2 * 60 * 1000,
      retry : false, // 실패시 재시도할 횟수.
    });
    

    return problemData;
  };

