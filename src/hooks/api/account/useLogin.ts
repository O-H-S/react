
import { postUserLogin } from "@/api/user/loginUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

export const useLogin = (onFinished?:any) =>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const queryClient = useQueryClient();
 
    //const setLoggedIn = useSetRecoilState(loggedIn);
    const navigate = useNavigate();
    const loginMutation = useMutation(
        {
            mutationFn: postUserLogin,
            mutationKey:['userData', 'me'],
            onSuccess: (data) =>{
                //setLoggedIn(true);
                enqueueSnackbar('로그인 성공', {
                    variant:'success'
                });
                queryClient.setQueryData(['userData', 'me'], data.data);
                queryClient.invalidateQueries({queryKey:['post']}); 
                queryClient.invalidateQueries({queryKey:['problems']}); 
                queryClient.invalidateQueries({queryKey:['problem']}); 
                queryClient.invalidateQueries({queryKey:['comment']}); 
                navigate(PATH.ROOT);
            },
            onError:(error)=>{
                //setLoggedIn(false);

                enqueueSnackbar('로그인 실패 (' + error.message + ")", {
                    variant:'error'
                });


            },
            onSettled:()=>{
                if(onFinished)
                    onFinished();
            }
        }

    );

    return {login:loginMutation.mutate, mutation:loginMutation};
};