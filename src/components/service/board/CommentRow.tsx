
import { TableRow, TableCell, Badge, Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography, Button, Divider, Stack } from "@mui/material";
import { useCommentSuspenseQuery } from "@/hooks/api/board/useCommentSuspenseQuery";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";
import type { CommentData } from "@/types/comment";
import { PATH } from "@/constants/path";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import { PROFILE } from "@/constants/api";
import { useCommentLikeMutation } from "@/hooks/api/board/useCommentLikeMutation";
import { loggedIn } from "@/store/auth";
import { useRecoilValue } from "recoil";
import { useUserDataQuery } from "@/hooks/api/account/useUserDataQuery";
import { useCommentMutation } from "@/hooks/api/board/useCommentMutation";
import { useSnackbar } from "notistack";

export const CommentRowSkeleton = ()=>{
    return (
        <Box>
            CommentRowSkeleton
        </Box>
    )
}

export const CommentRow = ({commentId, onRowClick}:{commentId?:number|undefined, onRowClick?: any | undefined}) => {
    const commentData : CommentData = useCommentSuspenseQuery(commentId||0, {
        enabled: !!commentId
    });


    const navigate = useNavigate();
    const {likeComment, unlikeComment} = useCommentLikeMutation();
    const {userData:myData, isLoading, isError, error} = useUserDataQuery('me');
    const isLoggedIn = useRecoilValue(loggedIn);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const {deleteComment} = useCommentMutation({
        onSuccess:(data:any) =>{
            enqueueSnackbar('댓글을 삭제하였습니다.', {
                variant:'success',
                style: { whiteSpace: "pre-line" },
            });
        }
    });
    

    const handleCommentDelete = () => {
        if(!commentId)
            return;
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if(!isConfirmed)
            return;
        
        deleteComment({id:commentId});


    }

    const handleLike = () => {
        if(!commentId)
            return;
        if(!isLoggedIn)
        {
            alert("로그인 후 이용 가능합니다.");
            return;
        }
        if (!liked) {
            likeComment({id:commentId});
        }
        else{
            unlikeComment({id:commentId});
        }
    };


    const content = commentData?.content || "";
    const createDate = commentData?.createDate || null;
    const likes = commentData?.likeCount || 0;
    const liked = commentData?.liked;

    return (
        <ListItem key={commentId} alignItems="center" >
            <ListItemAvatar>
                <Avatar alt="User Avatar" src={PROFILE(commentData.writerProfile)} />
            </ListItemAvatar>
            <ListItemText
                
                primary={commentData.writerNickname}
                secondary={
                    <>

                        <Typography
                            sx={{ display: 'inline'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {content}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{marginTop:1}} >
                            {createDate &&
                                formatDistanceToNow(createDate as Date, {
                                    addSuffix: true,
                                    includeSeconds: true,
                                    locale: ko
                                })
                            }
                        </Typography>
                    </>
                }
            />
            <Box display="flex" alignItems="center">
                <Button startIcon={commentData.liked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}  color={commentData.liked? "primary":"inherit"} onClick={handleLike}>
                    추천 {likes}
                </Button>
            </Box>
            {myData && (myData.id == commentData.writerId) && 
                <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick ={handleCommentDelete}>삭제</Button>
            </Stack>
            }
        </ListItem>
)
};

