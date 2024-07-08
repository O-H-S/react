import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";

import type { UserData } from "@/types/user";
import { END_POINTS} from "@/constants/api";

export interface UserLoginForm {
    id: string;
    password: string;
  }
  
export interface UserLoginResponse {
  data: UserData;
}
  


export const postUserLogin = async (form : UserLoginForm) => {
    const {data} = await Instance.post<UserLoginForm, AxiosResponse<UserLoginResponse>>(
        END_POINTS.LOGIN, form, {useForm:true, handleAuthHeader:false}
    );
    return data;

};

