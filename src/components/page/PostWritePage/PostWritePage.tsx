import { useLocation, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Container, Paper, TextField, Button, Box, IconButton, Autocomplete, Chip, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useProblemPostCreation } from "@/hooks/api/problem/useProblemPostCreation";

import { usePostSuspenseQuery } from "@/hooks/api/board/usePostSuspenseQuery";
import { usePostContentMutation } from "@/hooks/api/board/usePostContentMutation";
import { useSnackbar } from "notistack";
import { usePostCreation } from "@/hooks/api/board/usePostCreation";
const PostWritePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const postData = usePostSuspenseQuery(Number(state.targetPost), {}, true);
    const [title, setTitle] = useState(postData ? postData.title : "");
    const [editorContent, setEditorContent] = useState<string>(postData ? postData.content : "");

    const [normalTags, setNormalTags] = useState<string[]>(postData? postData.normalTags :[]);
    const [highlightTags, setHighlightTags] = useState<string[]>(postData? postData.highlightTags :[]);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const { create: createProblemPost } = useProblemPostCreation(
        {
            onSuccess: () => {
                enqueueSnackbar('게시글을 작성하였습니다.', {
                    variant: 'success',
                    style: { whiteSpace: "pre-line" },
                });
                navigate(-1);
            }
        }


    );
    const { modify: modifyPost } = usePostContentMutation(
        {
            onSuccess: () => {
                enqueueSnackbar('게시글을 수정하였습니다.', {
                    variant: 'success',
                    style: { whiteSpace: "pre-line" },
                });
                navigate(-1);
            }
        }

    );

    const {create : createBoardPost} = usePostCreation(
        {
            onSuccess: () => {
                enqueueSnackbar('게시글을 작성하였습니다.', {
                    variant: 'success',
                    style: { whiteSpace: "pre-line" },
                });
                navigate(-1);
            }
        }
    );

    const handleContentChange = (content: string) => {
        setEditorContent(content);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleBack = () => {
        navigate(-1);
    };
    const handleSubmit = () => {
        if (state.targetProblem)
            createProblemPost({ id: state.targetProblem, form: { subject: title, content: editorContent,method:"problem", normalTags, highlightTags  } });
        if (state.targetPost) {
            modifyPost({ id: state.targetPost, form: { subject: title, content: editorContent, method:"direct",normalTags, highlightTags } });
        }
        if( state.targetBoard){
            createBoardPost({ boardId: state.targetBoard, form: { subject: title, content: editorContent, method:"direct",normalTags, highlightTags } });
        }
    };

    const handleTagClick = (tag: string, isHighlight: boolean) => {
        if (isHighlight) {
            setHighlightTags((prev) => prev.filter((t) => t !== tag));
            setNormalTags((prev) => [...prev, tag]);
        } else {
            setNormalTags((prev) => prev.filter((t) => t !== tag));
            setHighlightTags((prev) => [...prev, tag]);
        }
    };

    const handleNormalTagAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            const input = event.target as HTMLInputElement;
            const resultTag = input.value.trim();
            if (resultTag !== '' ) {
                if(!normalTags.includes(resultTag) && !highlightTags.includes(resultTag))
                    setNormalTags((prev) => [...prev, resultTag]);
                input.value = '';
                event.preventDefault();
            }
        }
    };

    const handleTagDelete = (tag: string, isHighlight: boolean) => {
        if (isHighlight) {
            setHighlightTags((prev) => prev.filter((t) => t !== tag));
        } else {
            setNormalTags((prev) => prev.filter((t) => t !== tag));
        }
    };
    return (
        <>
            <Button variant="contained" onClick={handleBack} style={{ marginLeft: 40, marginTop: 20 }}>
                <ArrowBack fontSize="large" />
            </Button>
            <Container maxWidth="lg">

                <Paper style={{ margin: 20, padding: '20px', marginTop: '20px' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="제목"
                        value={title}
                        onChange={handleTitleChange}
                        style={{ marginBottom: '20px' }}
                    />
                    <ReactQuill
                        theme="snow"
                        value={editorContent}
                        onChange={handleContentChange}
                        style={{
                            height: '400px', // Increased height for content area
                            marginBottom: '20px' // Adds some space below the editor
                        }}
                    />

                   <Divider  sx={{mt:10}} />
                      {(highlightTags.length>0||normalTags.length>0) &&  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, mt : 2 }}>
                            클릭하여 태그를 강조할 수 있습니다 (최대 5개)
                        </Typography>}
                    <Box sx={{ marginTop: 1, marginBottom: 2 }}>
                        {highlightTags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onClick={() => handleTagClick(tag, true)}
                                onDelete={() => handleTagDelete(tag, true)}
                                color="primary"
                                sx={{ margin: 0.5 }}
                            />
                        ))}
                        {normalTags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                variant="outlined"
                                onClick={() => handleTagClick(tag, false)}
                                onDelete={() => handleTagDelete(tag, false)}
                                sx={{ margin: 0.5 }}
                            />
                        ))}
                    </Box>

                    <TextField
                        variant="outlined"
                        label="태그 추가"
                        placeholder="엔터를 누르면 추가됩니다."
                        onKeyDown={handleNormalTagAdd}
                        sx={{ marginTop: 2, marginBottom: 1 }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SendIcon />}
                            onClick={handleSubmit}
                            style={{ marginTop: 50 }}
                        >
                            제출
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default PostWritePage;