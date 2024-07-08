import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";

import type { UserData } from "@/types/user";
import { END_POINTS} from "@/constants/api";


export interface UserRegisterForm {
    username: string;
    nickname: string;
    password: string;
    password2: string;
    email: string;
  }
  
  export interface UserRegisterResponse {
    userData: UserData;
  }
    
  
export const postUserData = async (form : UserRegisterForm) => {
    const {data} = await Instance.post<UserRegisterForm, AxiosResponse<UserRegisterResponse>>(
        END_POINTS.USER(), form, {useForm:true}
    );
    return data;
};
