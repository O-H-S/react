import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS} from "@/constants/api";


export interface PostLikeDeleteForm {

  }
  
export interface PostLikeDeleteResponse {
    id : number,
    changed : boolean,
    count : number
}

  
export const deletePostLike = async (id : number|string, form? : PostLikeDeleteForm) => {
    const {data} = await Instance.delete<PostLikeDeleteForm, AxiosResponse<PostLikeDeleteResponse>>(
        END_POINTS.POST(id) + "/postLikes", form
    );
    return data;
};