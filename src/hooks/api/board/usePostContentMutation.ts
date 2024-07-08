import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

import { putPost } from "@/api/board/putPost";
import type { PostPutForm, PostPutResponse } from "@/api/board/putPost";
import { PostData } from "@/types/post";

export const usePostContentMutation = ({onSuccess, onError, onFinished}:any = {}) =>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const queryClient = useQueryClient();

    const putMutation = useMutation(
        {
            mutationFn : ({id, form}: { id: number|string; form: PostPutForm }) => putPost(id, form),
        
            onSuccess: (data, variables) =>{

                queryClient.setQueryData(['post', Number(variables.id)], (oldData: any) => ({
                    ...data
                    //...oldData,
                    //title:variables.form.subject,
                    //content:variables.form.content,

                }));
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
        modify:putMutation.mutate, modifyMutation:putMutation
    };
};