import type { AxiosResponse } from 'axios';
import { Instance } from "../instance";


import { END_POINTS } from "@/constants/api";
import { ProblemBookmarkType } from '@/types/problem';




export interface ProblemBookmarkDeleteResponse {
    changed: boolean,
}


export const deleteProblemBookmark = async (id: number | string) => {
    const { data } = await Instance.delete<void, AxiosResponse<ProblemBookmarkDeleteResponse>>(
        END_POINTS.PROBLEM(id) + "/bookmarks"
    );
    return data;
};