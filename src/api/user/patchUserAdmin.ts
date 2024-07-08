import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";

import type { UserData } from "@/types/user";
import { END_POINTS} from "@/constants/api";

export interface PatchUserAdminRequest {
    adminKey:string
  }
export interface PatchUserAdminResponse {

}
  


export const patchUserAdmin = async (request : PatchUserAdminRequest) => {
    const {data} = await Instance.patch<PatchUserAdminRequest, AxiosResponse<PatchUserAdminResponse>>(
        END_POINTS.USER('me')+'/admin', request
    );
    return data;

};

