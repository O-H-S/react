import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";

import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";
import { postComment } from "@/api/board/postComment";
import type { CommentPostForm, CommentPostResponse } from "@/api/board/postComment";
import { deleteComment } from "@/api/board/deleteComment";
import type { CommentDeleteForm, CommentDeleteResponse } from "@/api/board/deleteComment";
import { PostData } from "@/types/post";

export const useCommentMutation = ({onSuccess, onError, onFinished}:any = {}) =>{
    const queryClient = useQueryClient();

    const creationMutation = useMutation(
        {
            mutationFn : ({id, form}: { id: number|string; form: CommentPostForm }) => postComment(id, form),
            onSuccess: (data, variables) =>{
                const comment = data.commentData;

                queryClient.invalidateQueries({queryKey:['comments', comment.postId]}); 
                queryClient.setQueryData(['comment', comment.id], comment);
                queryClient.setQueryData(['post', comment.postId], (oldData: any) => ({
                    ...oldData,
                    commentCount:data.commentCount
                }));

                if(onSuccess)
                    onSuccess(data, variables);
                return data;
                
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
            mutationFn : ({id, form}: { id: number|string; form?: CommentDeleteForm }) => deleteComment(id, form),
            onSuccess: (data, variables) =>{
                queryClient.invalidateQueries({queryKey:['comments', data.postId]}); 
                queryClient.invalidateQueries({queryKey: ['comment', Number(variables.id)]});
                
                
                queryClient.setQueryData(['post', data.postId], (oldData: any) => ({
                    ...oldData,
                    commentCount:data.commentCount
                }));
                
                if(onSuccess)
                    onSuccess(data, variables);
                return data;
                
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
        createComment:creationMutation.mutate, createMutation:creationMutation,
        deleteComment:deleteMutation.mutate, deleteMutation:deleteMutation,
    };
};