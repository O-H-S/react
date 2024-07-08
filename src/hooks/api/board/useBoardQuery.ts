import type { AxiosError } from 'axios';
import type { UserData } from '@type/user';

import {useQuery } from '@tanstack/react-query';
import { getBoard } from '@/api/board/getBoard';

import { useSetRecoilState } from 'recoil';
import { loggedIn } from '@store/auth';
import { useEffect } from 'react';
import { BoardData } from '@/types/board';
import { BOARD_WRAPPER } from '@/constants/wrapper';

export const useBoardQuery = (boardId : number|string ) => {

  const {
    data: boardData,
    isLoading,
    isError,
    error,
  } = useQuery<BoardData, AxiosError>({
    queryKey: ['board', boardId],
    queryFn: async () =>{
      const resultBoard = await getBoard(boardId);
      resultBoard.id = boardId;
      return BOARD_WRAPPER(boardId, resultBoard);
    } ,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Disable retries
    throwOnError:false,
  });

  return {
    boardData,
    isLoading,
    isError,
    error,
  };
};

