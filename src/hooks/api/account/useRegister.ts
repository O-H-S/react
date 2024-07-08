import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";
import { postUserData } from "@/api/user/postUserData";

export const useRegister = (onError?:any, onFinished?:any) =>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const registerMutation = useMutation(
        {
            mutationFn: postUserData,
            onSuccess: (data) =>{

                enqueueSnackbar('회원가입 성공 \n 이제 입력한 정보로 로그인 해주세요', {
                    variant:'success',
                    style: { whiteSpace: "pre-line" },
                });
                queryClient.setQueryData(['userData', data.userData.id], data.userData);
                
                navigate(PATH.LOGIN);
            },
            onError:(error)=>{
                if(onError)
                    onError(error);
        
                


            },
            onSettled:()=>{
                if(onFinished)
                    onFinished();
            }
        }

    );

    return {register:registerMutation.mutate, mutation:registerMutation};
};