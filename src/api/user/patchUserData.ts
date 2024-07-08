import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";

import type { UserData } from "@/types/user";
import { END_POINTS} from "@/constants/api";

export interface PatchUserRequest {
    changes: {
      [key: string]: string;
    };
  }
export interface PatchUserResponse {
  data: UserData;
}
  


export const patchUserData = async (userId : string = 'me', request : PatchUserRequest) => {
    const {data} = await Instance.patch<PatchUserRequest, AxiosResponse<PatchUserResponse>>(
        END_POINTS.USER(userId), request
    );
    return data;

};

