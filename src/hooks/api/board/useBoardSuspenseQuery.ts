import type { AxiosError } from 'axios';
import type { BoardData } from '@/types/board';

import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { getBoard } from '@/api/board/getBoard';
import { BOARD_WRAPPER } from '@/constants/wrapper';


export const useBoardSuspenseQuery = (id: number | string | undefined , options?: any): BoardData => {
    const queryClient = useQueryClient();
    const { data: boardData } = useSuspenseQuery<any, AxiosError>({

        queryKey: ['board', id],
        queryFn: !id? null : async () => {
            var result = await getBoard(id);
            result.id = id;
            result = BOARD_WRAPPER(id, result);
            if (typeof id === 'string') {
                queryClient.setQueryData(['board', result.id], result);
            }
            return result;
        },
        gcTime: 5 * 60 * 1000, // 쿼리 데이터가 캐시에서 삭제되기까지의 시간
        staleTime: 2 * 60 * 1000,
        retry: false, // 실패시 재시도할 횟수.     
        ...options
    });


    return boardData;
};

