
import type { PostData } from '@/types/post';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import { convertToDate } from '../common';




export const getPost = async (id : number|string) => {
    const response = await Instance.get<PostData>(END_POINTS.POST(id));
    const post = response.data ;
    post.createDate = convertToDate(post.createDate as number[]);
    return post;
};