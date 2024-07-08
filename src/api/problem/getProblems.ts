
import { ProblemBookmarkType, type ProblemData } from '@type/problem';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import { convertToDate } from '../common';

export interface ProblemPaginationForm {
  page: number;
  pageSize: number;
  platforms?: string[];
  sort?: string ;
  isDescending?: boolean;
  keywords?: string;
  minLevel?:number;
  maxLevel?:number;
}

export interface ProblemPaginationResponse {
  totalPages: number;
  totalCounts: number;
  data: ProblemData[];

}


const stringToProblemBookmarkType = (str: string | null): ProblemBookmarkType | null => {
  if (!str)
    return null;
  if (Object.values(ProblemBookmarkType).includes(str as ProblemBookmarkType)) {
    return str as ProblemBookmarkType;
  }
  return null; // 변환할 수 없는 경우 null 반환
};


export const getProblems = async (pagination: ProblemPaginationForm) => {
  // 쿼리 스트링 작성
  const params = new URLSearchParams();

  params.append('page', pagination.page.toString());
  params.append('pageSize', pagination.pageSize.toString());

  if (pagination.platforms && pagination.platforms.length > 0) {
    params.append('platforms', pagination.platforms.join(','));
  }
  if (pagination.sort) {
    params.append('sort', pagination.sort);
  }
  if (pagination.isDescending !== undefined) {
    params.append('isDescending', pagination.isDescending.toString());
  }
  if (pagination.keywords) {
    params.append('keywords', pagination.keywords);
  }
  if(pagination.minLevel){
    params.append('minLevel', pagination.minLevel.toString());
  }
  if(pagination.maxLevel){
    params.append('maxLevel', pagination.maxLevel.toString());
  }
  const queryParams = params.toString();


  const response = await Instance.get<ProblemPaginationForm, AxiosResponse<ProblemPaginationResponse>>(`${END_POINTS.PROBLEM()}?${queryParams}`);
  const data = response.data;

  // 바로 받은 데이터 내의 foundDate를 Date 객체로 변환
  data.data.forEach(problem => {
    if (Array.isArray(problem.foundDate)) {
      problem.foundDate = convertToDate(problem.foundDate);
      problem.bookmarkType = stringToProblemBookmarkType(problem.bookmarkType);
    }
  });
  return data;
};