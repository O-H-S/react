import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postPostLike } from "@/api/board/postPostLike";
import { deletePostLike } from "@/api/board/deletePostLike";
import type { PostLikePostForm, PostLikePostResponse } from "@/api/board/postPostLike";
import type { PostLikeDeleteForm, PostLikeDeleteResponse } from "@/api/board/deletePostLike";

export const usePostLikeMutation = (onError?:any, onFinished?:any) =>{

    const queryClient = useQueryClient();

    const creationMutation = useMutation(
        {
            mutationFn : ({id, form}: { id: number|string; form?: PostLikePostForm }) => postPostLike(id, form),
            onSuccess: (data) =>{
                queryClient.setQueryData(['post', data.id], (oldData: any) => ({
                    ...oldData,
                    likeCount: data.count,
                    liked : true,
                }));
                
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
            mutationFn : ({id, form}: { id: number|string; form?: PostLikeDeleteForm }) => deletePostLike(id, form),
        
            onSuccess: (data) =>{
                //queryClient.setQueryData(['post', data.postData.id], data.postData);
                // 기존의 post 캐시 전체가 존재한다면, post.likeCount = data.count로 캐시를 일부만 변경한다.
                //console.log(queryClient.getQueryData(['post', data.id]));
                queryClient.setQueryData(['post', data.id], (oldData: any) => ({
                    ...oldData,
                    likeCount: data.count,
                    liked : false,
                }));
                //console.log(queryClient.getQueryData(['post', data.id]));
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
        likePost:creationMutation.mutate, likeMutation:creationMutation,
        unlikePost:deleteMutation.mutate, unlikeMutation:deleteMutation
    };
};