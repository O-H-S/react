
import type { ProblemData } from '@type/problem';
import { ProblemBookmarkType } from '@type/problem';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import { convertToDate } from '../common';




const stringToProblemBookmarkType = (str: string|null): ProblemBookmarkType | null => {
  if(!str)
    return null;
  if (Object.values(ProblemBookmarkType).includes(str as ProblemBookmarkType)) {
      return str as ProblemBookmarkType;
  }
  return null; // 변환할 수 없는 경우 null 반환
};

export const getProblem = async (id : number) => {

    const response = await Instance.get<ProblemData>(END_POINTS.PROBLEM(id.toString()));
    console.log(response.data);
    const problem = response.data ;

    problem.foundDate = convertToDate(problem.foundDate as number[]);
    problem.bookmarkType = stringToProblemBookmarkType(problem.bookmarkType );
    return problem;
};