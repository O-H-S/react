

import type { UserData } from '@/types/user';
import type { AxiosResponse } from 'axios';
import { END_POINTS } from '@constants/api';
import { Instance } from '@api/instance';
import type { UserNotification } from '@/types/user';
import { convertToDate } from '../common';


export interface GetUserNotificationsResponse {
    
    notifications : UserNotification[];
    nextCursor: number[]| Date;

}


export const getUserNotifications = async ( lastDatetime: Date|undefined)  => {

    const params = new URLSearchParams();
    if (lastDatetime) {
        params.append('lastDatetime', lastDatetime.toISOString());
    }

    const url = `${END_POINTS.USER('me')}/notifications?${params.toString()}`;
    const response = await Instance.get<GetUserNotificationsResponse>(url);
    const data = response.data;

    data.nextCursor = data.nextCursor && convertToDate(data.nextCursor as number[]);
    data.notifications.forEach(note => {
        note.timestamp = convertToDate(note.timestamp as number[]);
    });

    return data;
};