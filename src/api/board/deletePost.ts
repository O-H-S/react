import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS} from "@/constants/api";


export interface PostDeleteForm {

  }
  
export interface PostDeleteResponse {

}

  
export const deletePost = async (id : number|string, form? : PostDeleteForm) => {
    const {data} = await Instance.delete<PostDeleteForm, AxiosResponse<PostDeleteResponse>>(
        END_POINTS.POST(id), form
    );
    return data;
};