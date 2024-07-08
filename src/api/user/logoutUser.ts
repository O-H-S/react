import { Instance } from '@api/instance';

import { END_POINTS } from '@constants/api';

export const logoutUser = () => {
    return Instance.delete(END_POINTS.LOGOUT, {handleAuthHeader:false});
  };