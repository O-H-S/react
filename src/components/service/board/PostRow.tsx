import { TableRow, TableCell, Avatar, Box, Typography, Tooltip, Chip } from "@mui/material";
import { usePostSuspenseQuery } from "@/hooks/api/board/usePostSuspenseQuery";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { PROFILE } from "@/constants/api";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const tableCellStyles = {
    verticalAlign: 'middle',
    padding: '8px 16px',
    height: 50,
};

export const PostRowSkeleton = () => {
    return (
        <TableRow>
            <TableCell align="center" sx={tableCellStyles}></TableCell>
            <TableCell align="left" sx={tableCellStyles}></TableCell>
        </TableRow>
    );
};

const defaultTagWrapper = (tagName: string, tagType: string) => {
    if (tagType === 'system')
        return null;
    return tagName;
}


const renderChips = (tags: string[], tagType: string, tagWrapper: (tagName: string, tagType: string) => string) => {
    return tags.map((tag) => {
        const resultTagName = tagWrapper(tag, tagType);
        return (
            resultTagName && (
                <Chip
                    key={tag}
                    label={resultTagName}
                    size="small"
                    color={tagType=="system"?"secondary":"info"}
                    sx={{
                        fontSize: '0.7rem',
                        padding: 0,
                        height: 20,
                        // borderRadius: 4
                    }}
                />
            )
        );
    });
};



export const PostRow = ({ postId, onRowClick, tagWrapper = defaultTagWrapper }: { postId?: number | undefined, onRowClick?: any | undefined, tagWrapper?: any }) => {
    const navigate = useNavigate();
    const postData = usePostSuspenseQuery(postId || 0, { enabled: !!postId });

    const title = postData?.title || "";
    const userNickname = postData?.userNickname || "";
    const userProfile = postData?.userProfile || null;
    const commentsCount = postData?.commentCount || "";
    const likeCount = postData?.likeCount || "";
    const viewCount = postData?.viewCount || "";
    const createDate = postData?.createDate || null;

    const systemTags = postData?.systemTags || [];
    const highlightTags = postData?.highlightTags || [];
    const normalTags = postData?.normalTags || [];

    const handleRowClick = () => {
        if (postData?.id) {
            navigate(PATH.POST_DETAIL(postData.id.toString()));
        }
    };

    return (
        <TableRow hover onClick={handleRowClick} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f9f9f9' } }}>
            <TableCell align="center" sx={{ ...tableCellStyles, fontWeight: "bold" }}>{postId || ""}</TableCell>
            <TableCell align="left" sx={{ ...tableCellStyles }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography variant="body1">{title}</Typography>
                        {commentsCount && (
                            <Typography
                                variant="body2"
                                sx={{
                                    ml: 2,
                                    color: '#ff5722',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}
                            >
                                [{commentsCount}]
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {renderChips(systemTags, 'system', tagWrapper)}
                        {renderChips(highlightTags, 'highlight', tagWrapper)}
                    </Box>
                </Box>
            </TableCell>
            <TableCell align="center" sx={tableCellStyles}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {userProfile && (
                        <Tooltip title={userNickname} arrow>
                            <Avatar src={PROFILE(userProfile)} sx={{ width: 24, height: 24, mr: 1 }} />
                        </Tooltip>
                    )}
                    <Typography variant="body2">{userNickname}</Typography>
                </Box>
            </TableCell>
            <TableCell align="center" sx={{ ...tableCellStyles }}>
                {likeCount && (
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#f0f4ff',
                            borderRadius: 1,
                            p: 1,
                            gap: 1.0
                        }}
                    >
                        <ThumbUpAltIcon
                            fontSize="small"
                            sx={{ color: '#3f51b5' }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#3f51b5',
                                fontWeight: 'bold'
                            }}
                        >
                            {likeCount}
                        </Typography>
                    </Box>
                )}
            </TableCell>
            <TableCell align="center" sx={tableCellStyles}>{viewCount}</TableCell>
            <TableCell align="center" sx={tableCellStyles}>
                {createDate &&
                    formatDistanceToNow(createDate as Date, {
                        addSuffix: true,
                        includeSeconds: true,
                        locale: ko
                    })
                }
            </TableCell>
        </TableRow>
    );
};