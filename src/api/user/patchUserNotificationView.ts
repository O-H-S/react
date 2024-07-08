import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";

import type { UserNotification } from "@/types/user";
import { END_POINTS} from "@/constants/api";


export interface PatchUserNotificationResponse {

}
  

export const patchUserNotificationView = async (notificationId : number) => {
    const {data} = await Instance.patch<PatchUserNotificationResponse>(
        "/api/notifications/"+notificationId+"/viewed"
    );
    return data;
};

