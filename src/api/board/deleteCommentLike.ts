import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS} from "@/constants/api";


export interface CommentLikeDeleteForm {

  }
  
export interface CommentLikeDeleteResponse {
    id : number,
    changed : boolean,
    count : number
}

  
export const deleteCommentLike = async (id : number|string, form? : CommentLikeDeleteForm) => {
    const {data} = await Instance.delete<CommentLikeDeleteForm, AxiosResponse<CommentLikeDeleteResponse>>(
        END_POINTS.COMMENT(id) + "/commentLikes", form
    );
    return data;
};