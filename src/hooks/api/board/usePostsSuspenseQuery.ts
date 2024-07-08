import type { AxiosError } from 'axios';
import type { PostData } from '@/types/post';


import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts } from '@/api/board/getPosts';
import type { PostPaginationForm, PostPaginationResponse } from '@/api/board/getPosts';



export const usePostsSuspenseQuery = (boardId:number|string , form : PostPaginationForm) => {
    const queryClient = useQueryClient();
    const { data: resultData  } = useSuspenseQuery<any, AxiosError>({
    
      queryKey: ['posts', boardId, form.pageSize, form.page],
      // queryFn이 받는 인자는 React Query에 의해 정해져 있고, 기본적으로 queryKey와 queryFnContext 두 가지를 포함하는 객체 형태로 제공
      queryFn: async () => {
        var result = await getPosts(boardId, form);
        const ids = result.data.map(post => {
            queryClient.setQueryData(['post', post.id], post);
            return post.id;
        });
        return {postIds:ids, postsData: result.data ,totalPages:result.totalPages, totalCounts:result.totalCounts};
      },
      gcTime: 5 * 60 * 1000, // 쿼리 데이터가 캐시에서 삭제되기까지의 시간
      staleTime: 2 * 60 * 1000,
      retry : false, // 실패시 재시도할 횟수.
    });
    

    return resultData;
  };

