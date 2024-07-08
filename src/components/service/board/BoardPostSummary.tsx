import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
  Avatar,
  Paper,
  SxProps,
  Theme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBoardQuery } from "@/hooks/api/board/useBoardQuery";
import { usePostsSuspenseQuery } from "@/hooks/api/board/usePostsSuspenseQuery";
import { PostData } from "@/types/post";
import { PATH } from "@/constants/path";
import FolderIcon from "@mui/icons-material/Folder";

interface BoardPostSummaryProps {
  boardId: number | string;
  sx?: SxProps<Theme>;
  rowSx? : SxProps<Theme>;
}

const BoardPostSummary = ({ boardId, sx, rowSx }: BoardPostSummaryProps) => {
  const { boardData } = useBoardQuery(boardId);
  const postsDataQuery = usePostsSuspenseQuery(boardId, { page: 0, pageSize: 5 });
  const postsData = postsDataQuery.postsData;
  const navigate = useNavigate();

  const handleTitleClick = () => {
    if (boardData?.id) {
      navigate(PATH.BOARD(boardData.id.toString()));
    }
  };

  const handleMoreClick = () => {
    if (boardData?.id) {
      navigate(PATH.BOARD(boardData.id.toString()));
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, ...sx }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Typography
            variant="h6"
            component="h2"
            onClick={handleTitleClick}
            gutterBottom
            sx={{
              cursor: "pointer",
              fontWeight: 'bold',
              "&:hover": { color: "primary.main", textDecoration: "underline" },
              color: "text.primary",
            }}
          >
            {boardData?.title || "Board"}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleMoreClick}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 'medium',
              boxShadow: 'none',
            }}
          >
            More
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      {postsData?.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          게시글이 없습니다
        </Typography>
      ) : (
        <List sx={{ maxWidth: '100%', bgcolor: 'background.paper', ...rowSx }}>
          {postsData &&
            postsData.map((post: PostData) => (
              <ListItem
                key={post.id}
                alignItems="center"
                button
                onClick={() => navigate(PATH.POST_DETAIL(post.id.toString()))}
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  py: 1,
                  px:0,
                  borderRadius: '8px',
                  transition: 'background-color 0.2s ease-in-out',
                  bgcolor: 'transparent'
                }}
              >
                <Avatar sx={{ mr: 2, width: 30, height: 30, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <FolderIcon fontSize="small"/>
                </Avatar>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" width="100%">
                      <Typography variant="body1" noWrap sx={{ fontWeight: 'medium', flex: 1, mr: 1 }}>
                        {post.title}
                      </Typography>
                      {post.commentCount > 0 && (
                        <Box sx={{ flexShrink: 0 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            [{post.commentCount}개의 댓글]
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                  sx={{ my: 0, overflow: 'hidden' }}
                />
              </ListItem>
            ))}
        </List>
      )}
    </Paper>
  );
};

export default BoardPostSummary;