
import type { BoardData } from '@/types/board';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';



export const getBoard = async (id : number|string) => {
    const response = await Instance.get<BoardData>(END_POINTS.BOARD(id));
    const board = response.data ;
    return board;
};