import type { AxiosError } from 'axios';
import type { ProblemData } from '@/types/problem';
import type { ProblemPaginationForm, ProblemPaginationResponse } from '@/api/problem/getProblems';

import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { getProblems } from '@/api/problem/getProblems';


function generateHash(source: ProblemPaginationForm): string {

  const obj = { ...source };
  obj.page = 0;
  obj.pageSize = 0;

  if(obj.isDescending === undefined) obj.isDescending = true;
  if(obj.keywords === undefined || obj.keywords.length == 0) obj.keywords = undefined;
  if(obj.sort === undefined) obj.sort = "FoundDate";
  if(obj.minLevel === undefined) obj.minLevel = 0.0;
  if(obj.maxLevel === undefined) obj.maxLevel = 5.0;
  //if(obj.platforms === undefined) obj.isDescending = true;

  const str = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}



export const useProblemsSuspenseQuery = (form : ProblemPaginationForm) => {
    const queryClient = useQueryClient();
    const { data: problemsData } = useSuspenseQuery<ProblemPaginationResponse, AxiosError>({
    
      queryKey: ['problems', generateHash(form) , form.pageSize, form.page],
      // queryFn이 받는 인자는 React Query에 의해 정해져 있고, 기본적으로 queryKey와 queryFnContext 두 가지를 포함하는 객체 형태로 제공
      queryFn: async () => {
        var result = await getProblems(form);
        result.data.forEach(problem => {
            queryClient.setQueryData(['problem', problem.id], problem);
        });
        return result;
      },
      gcTime: 5 * 60 * 1000, // 쿼리 데이터가 캐시에서 삭제되기까지의 시간
      staleTime: 2 * 60 * 1000,
      retry : false, // 실패시 재시도할 횟수.
    });
    

    return { problemsData };
  };

