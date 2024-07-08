import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";
import type { CommentData } from '@/types/comment';
import { END_POINTS} from "@/constants/api";




export interface CommentPostForm {
    content: string;
}
  
export interface CommentPostResponse {
    commentCount:number;
    commentData: CommentData;
}
    
  
export const postComment= async (postId : string|number, form : CommentPostForm) => {
    const {data} = await Instance.post<CommentPostForm, AxiosResponse<CommentPostResponse>>(
        "api/"+postId + "/comments", form
    );
    const comment = data.commentData;


    return data;
};
