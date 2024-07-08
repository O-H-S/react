import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS} from "@/constants/api";


export interface CommentLikePostForm {

  }
  
export interface CommentLikePostResponse {
    id : number,
    changed : boolean,
    count : number
}

  
export const postCommentLike = async (id : number|string, form? : CommentLikePostForm) => {
    const {data} = await Instance.post<CommentLikePostForm, AxiosResponse<CommentLikePostResponse>>(
        END_POINTS.COMMENT(id) + "/commentLikes", form
    );
    return data;
};