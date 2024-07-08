
import type { CommentData } from '@/types/comment';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import { convertToDate } from '../common';



export const getComment = async (id : number|string) => {
    const response = await Instance.get<CommentData>(END_POINTS.COMMENT(id));
    const comment = response.data ;
    comment.createDate = convertToDate(comment.createDate as number[]);
    comment.modifyDate = convertToDate(comment.modifyDate as number[]);
    return comment;
};