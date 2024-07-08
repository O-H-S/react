
import { postUserLogin } from "@/api/user/loginUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";
import { UserData } from "@/types/user";
import { patchUserAdmin } from "@/api/user/patchUserAdmin";

export const useAdminLogin = ({onSuccess, onError, onFinished}:any = {}) =>{

    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const loginMutation = useMutation(
        {
            mutationFn: patchUserAdmin,
            mutationKey:['userData', 'me'],
            onSuccess: (data, variables) =>{

                queryClient.setQueryData<UserData|undefined>(['userData', 'me'], (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        admin:true
                    };
                }
                );
                if(onSuccess)
                    onSuccess(data, variables);
            },
            onError:(error, variables)=>{

                if(onError) onError(error, variables);
            },
            onSettled:()=>{
                if(onFinished)
                    onFinished();
            }
        }

    );

    return {adminLogin:loginMutation.mutate, mutation:loginMutation};
};