import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";
import type { PostData } from "@/types/post";
import { postPost } from "@/api/board/postPost";
import type { PostPostForm } from "@/api/board/postPost";


export const usePostCreation = ({onSuccess, onError, onFinished}:any = {}) =>{
    const queryClient = useQueryClient();
    const creationMutation = useMutation(
        {
            //mutationFn : (id : string|number, form : PostCreationForm)=> postProblemPost(id, form),
            //mutationFn은 단일 인자를 받는다. {} 묶어줘야함.
            mutationFn : ({boardId, form}: { boardId: string|number; form: PostPostForm }) => postPost(boardId, form),
            onSuccess: (data, variables) =>{

                queryClient.setQueryData(['post', data.id], data);
                queryClient.invalidateQueries({queryKey:['posts', variables.boardId]});


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

    return {create:creationMutation.mutate, mutation:creationMutation};
};