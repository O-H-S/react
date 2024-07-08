import { Instance } from '@api/instance';

import type { UserData } from '@type/user';
import { END_POINTS } from '@constants/api';

export const getUserData = async (userId : string = 'me') => {
    const { data } = await Instance.get<UserData>(END_POINTS.USER(userId));
    return data;
  };