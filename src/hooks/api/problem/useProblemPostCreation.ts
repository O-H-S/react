import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";
import { postProblemPost } from "@/api/problem/postProblemPost";
import type { PostCreationForm, ProblemPostCreationResponse } from "@/api/problem/postProblemPost";

export const useProblemPostCreation = ({onSuccess, onError, onFinished}:any = {}) =>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const creationMutation = useMutation(
        {
            //mutationFn : (id : string|number, form : PostCreationForm)=> postProblemPost(id, form),
            //mutationFn은 단일 인자를 받는다. {} 묶어줘야함.
            mutationFn : ({id, form}: { id: string | number; form: PostCreationForm }) => postProblemPost(id, form),
            onSuccess: (data, variables) =>{

                
                queryClient.setQueryData(['problem', data.problemData.id], data.problemData);
                queryClient.setQueryData(['post', data.postData.id], data.postData);
                queryClient.invalidateQueries({queryKey:['problemPosts', data.problemData.id]});


                if(onSuccess)
                    onSuccess(data, variables);
            },
            onError:(error)=>{
                if(onError)
                    onError(error);
                enqueueSnackbar('게시글 작성 실패 (' + error.message + ")", {
                    variant:'error'
                });
                
            },
            onSettled:()=>{
                if(onFinished)
                    onFinished();
            }
        }

    );

    return {create:creationMutation.mutate, mutation:creationMutation};
};