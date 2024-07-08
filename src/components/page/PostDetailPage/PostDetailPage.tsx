import { usePostSuspenseQuery } from "@/hooks/api/board/usePostSuspenseQuery";
import { useParams } from "react-router-dom";
import { Container, Card, CardContent, Typography, CircularProgress, Box, CardHeader, CardActions, Button, IconButton, Divider, TextField, Stack, Avatar, Chip } from '@mui/material';
import { useState } from "react";
import { usePostLikeMutation } from "@/hooks/api/board/usePostLikeMutation";
import { useCommentLikeMutation } from "@/hooks/api/board/useCommentLikeMutation";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { ThumbUpAltOutlined } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCommentMutation } from "@/hooks/api/board/useCommentMutation";
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { loggedIn } from "@/store/auth";
import { PROFILE } from "@/constants/api";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ArrowBack } from "@mui/icons-material";

import { CommentList } from "@/components/service/board/CommentList";

import { useUserDataQuery } from "@/hooks/api/account/useUserDataQuery";
import { usePostDelete } from "@/hooks/api/board/usePostDelete";
import { PATH } from "@/constants/path";
import { ProblemPostTagPrefix } from "@/constants/service";




const PostDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const postData = usePostSuspenseQuery(Number(id), { enabled: !!id }, true);
    const { userData: myData, isLoading, isError, error } = useUserDataQuery('me');
    const { likePost, unlikePost } = usePostLikeMutation();

    const isLoggedIn = useRecoilValue(loggedIn);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [commentText, setCommentText] = useState("");
    const { createComment } = useCommentMutation({
        onSuccess: (data: any) => {
            setCommentText("");
            enqueueSnackbar('댓글을 작성하였습니다.', {
                variant: 'success',
                style: { whiteSpace: "pre-line" },
            });
        }
    });
    const handleCommentSubmit = () => {
        if (!id)
            return;

        createComment({ id, form: { content: commentText } });

        //setCommentText(""); // Clear input after submission
    };

    const { deletePost } = usePostDelete({
        onSuccess: (data: any) => {
            enqueueSnackbar('게시글을 삭제하였습니다.', {
                variant: 'success',
                style: { whiteSpace: "pre-line" },
            });
            navigate(-1);
        }
    });
    const handlePostDelete = () => {
        if (!id)
            return;
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (!isConfirmed)
            return;

        deletePost({ id });


    }

    const handlePostModify = () => {
        if (!id)
            return;
        navigate(PATH.POST_WRITE, { state: { targetPost: id } });
    }

    const highlightTags = postData?.highlightTags || [];
    const normalTags = postData?.normalTags || [];
    const likes = postData?.likeCount || 0;
    const liked = postData?.liked;
    const handleLike = () => {
        if (!id)
            return;
        if (!isLoggedIn) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }
        if (!liked) {
            likePost({ id });
        }
        else {
            unlikePost({ id });
        }
    };
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Button variant="contained" onClick={handleBack} style={{ marginLeft: 40, marginTop: 20 }}>
                <ArrowBack fontSize="large" />
            </Button>


            <Container maxWidth="lg">
                {myData && (myData.id == postData.userId) &&
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={handlePostModify}>수정</Button>
                        <Button variant="outlined" onClick={handlePostDelete}>삭제</Button>
                    </Stack>
                }
                <Card raised sx={{ mt: 4, mb: 4 }}>

                    <Divider sx={{ my: 0 }} />
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                            <Typography variant="h4" component="div">{postData?.title}</Typography>
                            <Card variant="outlined" sx={{ backgroundColor: "ButtonFace", display: 'flex', alignItems: 'center', p: 2, width: 'auto' }}>
                                <Avatar alt="User Avatar" src={PROFILE(postData?.userProfile)} sx={{ mr: 2 }} />
                                <Stack spacing={0.5}>
                                    <Typography variant="subtitle1">{postData?.userNickname}</Typography>

                                </Stack>
                            </Card>
                        </Stack>

                        <Divider />
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" color="textSecondary"
                                sx={{ display: 'block', textAlign: 'right', mb: 1 }}>
                                작성일: {postData?.createDate.toLocaleString()}
                            </Typography>
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: postData?.content }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                            <Button
                                variant={liked ? "contained" : "outlined"}
                                color={liked ? "primary" : "inherit"}
                                onClick={handleLike}
                                startIcon={liked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlined />}
                            >
                                {liked ? "추천" : "추천"}
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {likes}
                                </Typography>
                            </Button>
                        </Box>

                        <Box sx={{ marginTop: 1, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                            {(highlightTags.length>0 || normalTags.length>0)&&(<Typography color="GrayText" fontSize="0.8rem" sx={{ mr: 1, display: 'inline-flex', alignItems: 'center' }}>
                                Tags
                            </Typography>)}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                                {highlightTags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        sx={{ fontSize: 10, mr: 0.5, mb: 0.5 }}
                                    />
                                ))}
                                {normalTags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontSize: 10, mr: 0.5, mb: 0.5 }}
                                    />
                                ))}
                            </Box>
                        </Box>

                    </CardContent>
                    <CardActions disableSpacing>
                        <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
                            댓글 {postData.commentCount}개
                        </Typography>

                    </CardActions>
                    <Divider sx={{}} />
                    <CommentList postId={Number(id)} />

                    <Box component="form" sx={{ mt: 2, margin: 4 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={isLoggedIn ? "댓글 작성" : "로그인 후 댓글을 작성하실 수 있습니다."}
                            multiline
                            rows={4}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            disabled={!isLoggedIn}
                        />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCommentSubmit} disabled={!isLoggedIn}>
                            제출
                        </Button>
                    </Box>
                </Card>
            </Container>
        </>
    );
}

export default PostDetailPage;