import type { AxiosError } from 'axios';
import { PostData } from '@/types/post';


import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { getPost } from '@/api/board/getPost';


export const usePostSuspenseQuery = (id : number|string, options:any, detail:boolean = false) :PostData   => {

    id = Number(id);
    const queryClient = useQueryClient();
    const curData : PostData|undefined = queryClient.getQueryData(['post', id]);
    if(curData && !curData.content && detail){
      queryClient.removeQueries({queryKey: ['post', id]});
    }
    const {data:postData}  = useSuspenseQuery<PostData, AxiosError>({
    
      queryKey: ['post', id],
      // queryFn이 받는 인자는 React Query에 의해 정해져 있고, 기본적으로 queryKey와 queryFnContext 두 가지를 포함하는 객체 형태로 제공
      queryFn: async () => {
        if(!id)
          return null;
        var result = await getPost(id);

        

        return result;
      },
      gcTime: 5 * 60 * 1000, // 쿼리 데이터가 캐시에서 삭제되기까지의 시간
      staleTime: 2 * 60 * 1000,
      retry : false, // 실패시 재시도할 횟수.
      ...options
    });
    
    

    return postData;
  };

