import { Box, Grid, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBoardQuery } from "@/hooks/api/board/useBoardQuery";
import { usePostsSuspenseQuery } from "@/hooks/api/board/usePostsSuspenseQuery";
import { PostData } from "@/types/post";
import { PATH } from "@/constants/path";
import { PostRow } from "./PostRow";
import { ErrorBoundary } from "react-error-boundary";

function EmptyFallback() {
    return null; // 아무것도 렌더링하지 않음
  }


const PostList = ({ boardId, page=0 , pageSize=0, onLoad, rowProps = {} }: { boardId: number | string, page?:number, pageSize?:number, onLoad:any, rowProps?:any }) => {
    const postsDataQuery = usePostsSuspenseQuery(boardId, { page: page, pageSize: pageSize });
    const postsData = postsDataQuery.postsData;
    onLoad(postsDataQuery);
    return (
        <>
            {postsData?.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                    게시글 없음
                </Typography>
            ) : (
                <>
                {postsData && postsData.map((post: PostData) => (
                    <ErrorBoundary key={post.id} FallbackComponent={EmptyFallback}>
                        <PostRow postId={post.id} onRowClick={()=>{}} {...rowProps} />
                    </ErrorBoundary>
                ))}
                </>
            )}
        </>
    );
};

export default PostList;
