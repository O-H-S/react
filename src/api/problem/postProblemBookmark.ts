import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS } from "@/constants/api";
import type { ProblemBookmarkType } from '@/types/problem';


export interface ProblemBookmarkPostForm {
    type: ProblemBookmarkType
}

export interface ProblemBookmarkPostResponse {
    changed: boolean,
}


export const postProblemBookmark = async (id: number | string, form?: ProblemBookmarkPostForm) => {
    const { data } = await Instance.post<ProblemBookmarkPostForm, AxiosResponse<ProblemBookmarkPostResponse>>(
        END_POINTS.PROBLEM(id) + "/bookmarks", form
    );
    return data;
};