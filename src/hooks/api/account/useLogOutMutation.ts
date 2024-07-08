import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PATH } from '@constants/path';
import {logoutUser } from '@api/user/logoutUser';
import { useSnackbar } from "notistack";

import { useSetRecoilState } from 'recoil';
import { loggedIn } from '@store/auth';

export const useLogOutMutation = () => {
  const setLoggedIn = useSetRecoilState(loggedIn);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
        
    const logOutMutation = useMutation({
        mutationFn: logoutUser,
        mutationKey:['userData', 'me'],
        onSuccess: () => {
          enqueueSnackbar('로그아웃 성공', {
            variant:'info'
          });
          queryClient.setQueryData(['userData', 'me'], null); // 캐시를 업데이트하는 것이지, 삭제하는 것이 아님.
          queryClient.invalidateQueries({queryKey:['post']}); 
          queryClient.invalidateQueries({queryKey:['problems']}); 
          queryClient.invalidateQueries({queryKey:['problem']}); 
          queryClient.invalidateQueries({queryKey:['comment']}); 
          setLoggedIn(false);
          
          //localStorage.removeItem(ACCESS_TOKEN_KEY);
          navigate(PATH.ROOT);
        },
        onError: () => {
          enqueueSnackbar('로그아웃에 실패하였습니다', {
            variant:'error'
          });
        },
      });
    return logOutMutation;

};