
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PATH } from '@constants/path';
import { patchUserData, PatchUserRequest } from '@/api/user/patchUserData';
import { useSnackbar } from "notistack";


export const useUserDataPatchMutation = (userId : string = 'me') => {

    const queryClient = useQueryClient();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const userMutation = useMutation({
        mutationFn: (data:any)=> patchUserData(userId, data),
        mutationKey:['userData', userId],

        //mutationFn: async ()=>undefined,
        onSuccess: (data) => {
            enqueueSnackbar('프로필이 수정되었습니다.', {
                variant:'success'
            });
            queryClient.setQueryData(['userData', userId], data);
            //queryClient.invalidateQueries({queryKey:['userData', userId]});
        },
        onError: (error) => {
            enqueueSnackbar('프로필 변경 실패 (' + error.message + ")", {
                variant:'error'
            });
        },
      });
    return userMutation;

};