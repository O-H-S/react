import { CommentRow } from './CommentRow';
import { ErrorBoundary } from 'react-error-boundary';
import { List } from '@mui/material';
import { useCommentsSuspenseQuery } from '@/hooks/api/board/useCommentsSuspenseQuery';
import { useCommentLikeMutation } from '@/hooks/api/board/useCommentLikeMutation';

function EmptyFallback() {
    return (null); // 아무것도 렌더링하지 않음
  }

export const CommentList = ({postId} : {postId:number}) =>{
    const commentsPaginationResult = useCommentsSuspenseQuery(postId, { page:0, pageSize:0});

    const handleRowClick = (link:string) => {

      };

    return (
        <List>
            {commentsPaginationResult.commentIds.map((id:any) => (
                <ErrorBoundary key={id} FallbackComponent={EmptyFallback}>
                    <CommentRow commentId={Number(id)} onRowClick={handleRowClick} />
                </ErrorBoundary>
            ))}
        </List>
    );
}