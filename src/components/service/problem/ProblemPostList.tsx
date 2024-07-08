import { PostRow } from "../board/PostRow";
import { useProblemPostsSuspenseQuery } from "@/hooks/api/problem/useProblemPostsSuspenseQuery";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

import { ProblemPostTagPrefix } from "@/constants/service";
function EmptyFallback() {
    return null; // 아무것도 렌더링하지 않음
  }


export const ProblemPostList = ({problemId ,page , pageSize, onLoad} : {problemId:number, page:any, pageSize:any, onLoad:any}) =>{
    const postsPaginationResult = useProblemPostsSuspenseQuery(problemId, { page, pageSize});
    const navigate = useNavigate();

    onLoad(postsPaginationResult);

    const handleRowClick = (link:string) => {

      };

    return (
        <>
            {postsPaginationResult.postIds.map((id:any) => (
                <ErrorBoundary key={id} FallbackComponent={EmptyFallback}>
                    <PostRow postId={id} onRowClick={handleRowClick} />
                </ErrorBoundary>
            ))}
        </>
    );
}