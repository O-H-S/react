
import type { ProblemData } from '@type/problem';
import type { PostData } from '@/types/post';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import { convertToDate } from '../common';

export interface ProblemPostPaginationForm {
    page: number;
    pageSize: number;
  }
  
export interface ProblemPostPaginationResponse {
    totalPages: number;
    totalCounts: number;
    data: PostData[];
    
}


export const getProblemPosts = async (problemId : number, pagination : ProblemPostPaginationForm) => {
    const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString()
      }).toString();


    const response = await Instance.get<ProblemPostPaginationForm, AxiosResponse<ProblemPostPaginationResponse>>(`${END_POINTS.PROBLEM_POST(problemId)}?${queryParams}`);
    const data = response.data;

    // 바로 받은 데이터 내의 foundDate를 Date 객체로 변환
    data.data.forEach(post => {
        if (Array.isArray(post.createDate)) {
          post.createDate = convertToDate(post.createDate);
        }
    });
    return data;
};