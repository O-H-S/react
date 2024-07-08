import { Instance } from '@api/instance';

import type { UserData } from '@type/user';
import { END_POINTS } from '@constants/api';

export interface ProfileUrlResponse {
  presignedUrl: string;
  profileKey:string;
}

export const getProfileUploadUrl = async (userId : string = 'me', file : File) => {

    const params = new URLSearchParams();
    params.append('contentLength', file.size.toString());
    params.append('contentType', file.type);

    const { data } = await Instance.get<ProfileUrlResponse>(END_POINTS.USER(userId) +"/profileUploadUrl?"+ params.toString());
    return data;
  };