import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS} from "@/constants/api";


export interface PostLikePostForm {

  }
  
export interface PostLikePostResponse {
    id : number,
    changed : boolean,
    count : number
}

  
export const postPostLike = async (id : number|string, form? : PostLikePostForm) => {
    const {data} = await Instance.post<PostLikePostForm, AxiosResponse<PostLikePostResponse>>(
        END_POINTS.POST(id) + "/postLikes", form
    );
    return data;
};