import type { AxiosError } from 'axios';
import type { CommentData } from '@/types/comment';


import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { getComments } from '@/api/board/getComments';
import type { CommentPaginationForm, CommentPaginationResponse } from '@/api/board/getComments';


export const useCommentsSuspenseQuery = (postId:number , form : CommentPaginationForm) => {
    const queryClient = useQueryClient();
    const { data: resultData  } = useSuspenseQuery<any, AxiosError>({
    
      queryKey: ['comments', postId, form.pageSize, form.page],
      queryFn: async () => {
        var result = await getComments(postId, form);
        const ids = result.data.map(comment => {
            queryClient.setQueryData(['comment', comment.id], comment);
            return comment.id;
        });
        return {commentIds:ids, totalPages:result.totalPages, totalCounts:result.totalCounts};
      },
      gcTime: 5 * 60 * 1000, // 쿼리 데이터가 캐시에서 삭제되기까지의 시간
      staleTime: 2 * 60 * 1000,
      retry : false, // 실패시 재시도할 횟수.
    });
    
    return resultData;
  };

