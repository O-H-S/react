import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS} from "@/constants/api";
import { PostPostForm } from './postPost';
import { PostData } from '@/types/post';


export interface PostPutForm extends PostPostForm {

}
  
export interface PostPutResponse extends PostData{

}

  
export const putPost = async (id : number|string, form : PostPutForm) => {
    const {data} = await Instance.put<PostPutForm, AxiosResponse<PostPutResponse>>(
        END_POINTS.POST(id), form
    );
    return data;
};