
import type { PostData } from '@/types/post';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import { convertToDate } from '../common';

export interface PostPaginationForm {
    page: number;
    pageSize: number;
  }
  
export interface PostPaginationResponse {
    totalPages: number;
    totalCounts: number;
    data: PostData[];
    
}



export const getPosts = async (boardId : number|string, pagination : PostPaginationForm) => {
    const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString()
      }).toString();


    const response = await Instance.get<PostPaginationForm, AxiosResponse<PostPaginationResponse>>(`${END_POINTS.POSTS(boardId)}?${queryParams}`);
    const data = response.data;

    // 바로 받은 데이터 내의 foundDate를 Date 객체로 변환
    data.data.forEach(post => {
        if (Array.isArray(post.createDate)) {
          post.createDate = convertToDate(post.createDate);
        }
        if (Array.isArray(post.modifyDate)) {
            post.modifyDate = convertToDate(post.modifyDate);
          }
    });
    return data;
};