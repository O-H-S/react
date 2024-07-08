import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError, AxiosResponse } from "axios";


import { postCommentLike } from "@/api/board/postCommentLike";
import { deleteCommentLike } from "@/api/board/deleteCommentLike";

import type { CommentLikePostForm, CommentLikePostResponse } from "@/api/board/postCommentLike";
import type { CommentLikeDeleteForm, CommentLikeDeleteResponse } from "@/api/board/deleteCommentLike";
import type { CommentData } from "@/types/comment";
export const useCommentLikeMutation = ({onSuccess, onError, onFinished}:any = {}) =>{

    const queryClient = useQueryClient();

    const creationMutation = useMutation(
        {
            mutationFn : ({id, form}: { id: number|string; form?: CommentLikePostForm }) => postCommentLike(id, form),
            onSuccess: (data, variables) =>{
                queryClient.setQueryData(['comment', variables.id], (oldData: CommentData) => ({
                    ...oldData,
                    likeCount: data.count,
                    liked : true,
                }));
                if(onSuccess)
                    onSuccess(data, variables)
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

    const deleteMutation = useMutation(
        {
            mutationFn : ({id, form}: { id: number|string; form?: CommentLikeDeleteForm }) => deleteCommentLike(id, form),
        
            onSuccess: (data, variables) =>{
                queryClient.setQueryData(['comment', variables.id], (oldData: CommentData) => ({
                    ...oldData,
                    likeCount: data.count,
                    liked : false,
                }));
                if(onSuccess)
                    onSuccess(data, variables)
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
        likeComment:creationMutation.mutate, likeMutation:creationMutation,
        unlikeComment:deleteMutation.mutate, unlikeMutation:deleteMutation
    };
};