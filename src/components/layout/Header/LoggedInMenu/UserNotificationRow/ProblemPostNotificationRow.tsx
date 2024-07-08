import { useUserNotificationViewedMutation } from "@/hooks/api/account/useUserNotificationViewedMutation";
import { ProblemPostNotification } from "@/types/user";
import { IconButton, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";


export const ProblemPostNotificationRow: React.FC<{ notification: ProblemPostNotification }> = ({ notification }) => {
  const { markAsViewed } = useUserNotificationViewedMutation();
  const navigate = useNavigate();

  const handleMarkAsViewed = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // 이벤트 버블링을 방지하여 전체 메뉴가 닫히지 않도록 함
    markAsViewed({ id: notification.id });
  };

  const handleMoveToPost = () =>{
    navigate(PATH.POST_DETAIL(notification.postId.toString()));
  }

  return (
    <>
      <ListItemText
        primary={
          <Typography variant="body1">
            북마크한 <strong> {notification.problemName}</strong>에 새로운 게시글이 작성되었습니다.
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="textSecondary">
            <ArrowForwardIcon fontSize="small" /> {notification.postName}
          </Typography>
        }
        onClick={handleMoveToPost}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="mark as viewed" onClick={handleMarkAsViewed}>
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};