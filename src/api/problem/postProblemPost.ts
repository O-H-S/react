import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";

import type { PostData } from '@/types/post';
import type { ProblemData } from '@/types/problem';
import { END_POINTS} from "@/constants/api";
import { PostPostForm } from '../board/postPost';
import { convertToDate } from '../common';


export interface PostCreationForm extends PostPostForm {

  }
  
export interface ProblemPostCreationResponse {
    postData: PostData;
    problemData : ProblemData;
}
    
  
export const postProblemPost= async (id : string|number, form : PostCreationForm) => {
    const {data} = await Instance.post<PostCreationForm, AxiosResponse<ProblemPostCreationResponse>>(
        END_POINTS.PROBLEM_POST(id), form
    );
    const problem = data.problemData;
    problem.foundDate = convertToDate(problem.foundDate as number[]);

    return data;
};
