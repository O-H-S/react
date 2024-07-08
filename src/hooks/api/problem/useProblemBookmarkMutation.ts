import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError, AxiosResponse } from "axios";


import { postProblemBookmark } from "@/api/problem/postProblemBookmark";
import { deleteProblemBookmark } from "@/api/problem/deleteProblemBookmark";
import type { ProblemBookmarkPostForm, ProblemBookmarkPostResponse } from "@/api/problem/postProblemBookmark";
import type { ProblemBookmarkDeleteResponse } from "@/api/problem/deleteProblemBookmark";
import type { ProblemData } from "@/types/problem";
export const useProblemBookmarkMutation = ({ onSuccess, onError, onFinished }: any = {}) => {

    const queryClient = useQueryClient();

    const creationMutation = useMutation(
        {
            mutationFn: ({ id, form }: { id: number | string; form: ProblemBookmarkPostForm }) => postProblemBookmark(id, form),
            onSuccess: (data, variables) => {
                queryClient.setQueryData<ProblemData | undefined>(['problem', Number(variables.id)], (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        bookmarkType: variables.form.type,
                    };
                }
                );
                if (onSuccess)
                    onSuccess(data, variables)
            },
            onError: (error) => {
                if (onError)
                    onError(error);

            },
            onSettled: () => {
                if (onFinished)
                    onFinished();
            }
        }

    );

    const deleteMutation = useMutation(
        {
            mutationFn: ({ id }: { id: number | string; }) => deleteProblemBookmark(id),
            onSuccess: (data, variables) => {
                queryClient.setQueryData<ProblemData | undefined>(['problem', Number(variables.id)], (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        bookmarkType: null,
                    };
                }
                );
                if (onSuccess)
                    onSuccess(data, variables)
            },
            onError: (error) => {
                if (onError)
                    onError(error);

            },
            onSettled: () => {
                if (onFinished)
                    onFinished();
            }
        }

    );



    return {
        bookmarkProblem: creationMutation.mutate, bookmarkProblemMutation: creationMutation,
        unbookmarkProblem: deleteMutation.mutate, unbookmarkProblemMutation : deleteMutation
    };
};