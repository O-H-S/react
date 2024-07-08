import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

import { deletePost } from "@/api/board/deletePost";
import type { PostDeleteForm, PostDeleteResponse } from "@/api/board/deletePost";


export const usePostDelete = ({onSuccess, onError, onFinished}:any = undefined) =>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        {
            mutationFn : ({id, form}: { id: number|string; form?: PostDeleteForm }) => deletePost(id, form),
        
            onSuccess: (data, variables) =>{

                queryClient.removeQueries({
                    queryKey : ['post', Number(variables.id)]
                });
                if(onSuccess)
                    onSuccess(data, variables);

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

    return {
        deletePost:deleteMutation.mutate, deleteMutation:deleteMutation
    };
};