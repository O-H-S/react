import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";
import type { CommentData } from '@/types/comment';
import { END_POINTS} from "@/constants/api";




export interface CommentDeleteForm {

}
  
export interface CommentDeleteResponse {
    postId:number;
    commentCount:number;
}
    
  
export const deleteComment = async (commentId : string|number, form? : CommentDeleteForm) => {
    const {data} = await Instance.delete<CommentDeleteForm, AxiosResponse<CommentDeleteResponse>>(
        END_POINTS.COMMENT(commentId), form
    );
    return data;
};
