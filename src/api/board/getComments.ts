import type { CommentData } from '@/types/comment';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import { convertToDate } from '../common';

export interface CommentPaginationForm {
    page: number;
    pageSize: number;
  }
  
export interface CommentPaginationResponse {
    totalPages: number;
    totalCounts: number;
    data: CommentData[];
    
}


export const getComments = async (postId : number, pagination : CommentPaginationForm) => {
    const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString()
      }).toString();


    const response = await Instance.get<CommentPaginationForm, AxiosResponse<CommentPaginationResponse>>("api/"+postId +"/comments"+ `?${queryParams}`);
    const data = response.data;

    // 바로 받은 데이터 내의 foundDate를 Date 객체로 변환
    data.data.forEach(comment => {
        if (Array.isArray(comment.createDate)) {
            comment.createDate = convertToDate(comment.createDate);
        }
        if (Array.isArray(comment.modifyDate)) {
          comment.modifyDate = convertToDate(comment.modifyDate)
      }
    });
    return data;
};