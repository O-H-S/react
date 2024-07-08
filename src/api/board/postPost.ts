import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS} from "@/constants/api";
import { PostData } from '@/types/post';

export interface PostPostForm {
    subject: string;
    content: string;
    method: string;
    normalTags : string[];
    highlightTags: string[];
}
  

  
export const postPost = async (boardId : number|string, form : PostPostForm) => {
    const queryParams = new URLSearchParams({
        includeData: "true",
      }).toString();



    const {data} = await Instance.post<PostPostForm, AxiosResponse<PostData>>(
        `${END_POINTS.POSTS(boardId)}?${queryParams}`, form
    );
    return data;
};