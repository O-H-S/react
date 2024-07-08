import React, { useState } from 'react';
import { Badge, Box, Popover, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

import { ProblemBookmarkType, ProblemData } from '@/types/problem';
import InfoIcon from '@mui/icons-material/Info'; //
import LockIcon from '@mui/icons-material/Lock'; //
import KeyIcon from '@mui/icons-material/Key'; //
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'; //

import Rating from '@mui/material/Rating';

import BaekjoonLogo from '@assets/platforms/baekjoon.png';
import ProgrammersLogo from '@assets/platforms/programmers.png';
import SWEALogo from '@assets/platforms/swea.png'
import SofteerLogo from '@assets/platforms/softeer.png'
import { PATH } from '@/constants/path';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useProblemBookmarkMutation } from '@/hooks/api/problem/useProblemBookmarkMutation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRecoilValue } from 'recoil';
import { loggedIn } from '@/store/auth';

const getImagePath = (platformName: string): any => {


  const images: { [key: string]: any } = {
    baekjoon: BaekjoonLogo,
    programmers: ProgrammersLogo,
    softeer: SofteerLogo,
    swea: SWEALogo,
  };
  return images[platformName];
};



/*
function getNormalizedDifficulty(data: ProblemData) {
  const difficulyTable: { [platform: string]: { [level: string]: number } } = {
    "baekjoon": {
      "Sprout": 0,

      "Bronze V": 1,
      "Bronze IV": 1.3,
      "Bronze III": 1.6,
      "Bronze II": 1.9,
      "Bronze I": 2.1,

      "Silver V": 2.2,
      "Silver IV": 2.3,
      "Silver III": 2.6,
      "Silver II": 2.9,
      "Silver I": 3,

      "Gold V": 3.1,
      "Gold IV": 3.2,
      "Gold III": 3.3,
      "Gold II": 3.4,
      "Gold I": 3.5,

      "Platinum V": 3.6,
      "Platinum IV": 3.7,
      "Platinum III": 3.8,
      "Platinum II": 3.9,
      "Platinum I": 4.0,

      "Diamond V": 4.1,
      "Diamond IV": 4.2,
      "Diamond III": 4.3,
      "Diamond II": 4.4,
      "Diamond I": 4.5,


      "Ruby V": 4.6,
      "Ruby IV": 4.7,
      "Ruby III": 4.8,
      "Ruby II": 4.9,
      "Ruby I": 5,




    },

    "softeer": {
      "level-1": 1,
      "level-2": 2,
      "level-3": 3,
      "level-4": 4,
      "level-5": 5,
    },
    "swea": {
      "D1": 0,
      "D2": 1.0,
      "D3": 2.0,
      "D4": 2.5,
      "D5": 3.5,
      "D6": 4.0,
      "D7": 4.5,
      "D8": 5,
    },
    "programmers": {
      "level-0": 0,
      "level-1": 1,
      "level-2": 2,
      "level-3": 3,
      "level-4": 4,
      "level-5": 5,
    },

  };

  if (!(data.platform in difficulyTable) || !(data.difficulty in difficulyTable[data.platform]))
    return -1;

  return difficulyTable[data.platform][data.difficulty];
}
*/

const ProblemRow = ({ row, onRowClick }: { row?: ProblemData | undefined, onRowClick?: any | undefined }) => {
  const queryClient = useQueryClient();
  const { bookmarkProblem, unbookmarkProblem } = useProblemBookmarkMutation();
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const { data: problemData, isLoading, isError } = useQuery({
    queryKey: ['problem', row?.id],
    queryFn: () => {
      if (row?.id) {
        return queryClient.getQueryData(['problem', row.id]);
      }
      return undefined;
    },
    enabled: !!row
  });

  const isLoggedIn = useRecoilValue(loggedIn);


  row = problemData ? problemData as ProblemData : undefined;
  const navigate = useNavigate();
  const title = row?.title || " ";
  const difficulty = row?.difficulty || " ";
  const platform = row?.platform || null;
  const postCount = row?.postCount;
  const level = row?.level;
  const open = Boolean(anchorEl);



  const handleBookmarkClick = (type: ProblemBookmarkType) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      return;
  }
    if (row) {
      bookmarkProblem({ id: row.id, form: { type } });
    }
  };
  const handlePopoverOpen: React.MouseEventHandler<SVGSVGElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getIconByBookmarkType = (bookmarkType:ProblemBookmarkType, props:any = {}) => {
    const commonProps = {
      sx: { cursor: 'pointer', margin: 0, padding: 0 },
      fontSize: 'large',
      onClick: () => handleBookmarkClick(bookmarkType),
      ...props,
  };
  
    switch (bookmarkType) {
        case ProblemBookmarkType.Unsolved:
            return (
                <Tooltip title='아직 시작하지 않았어요' arrow>
                    <HelpOutlineIcon color='secondary' {...commonProps} />
                </Tooltip>
            );
        case ProblemBookmarkType.FailedCompletely:
            return (
                <Tooltip title='풀지 못했어요' arrow>
                    <HighlightOffIcon color='error' {...commonProps} />
                </Tooltip>
            );
        case ProblemBookmarkType.TooLong:
            return (
                <Tooltip title='너무 오래 걸렸어요' arrow>
                    <AccessTimeIcon color='warning'{...commonProps} />
                </Tooltip>
            );
        case ProblemBookmarkType.Success:
            return (
                <Tooltip title='풀었어요' arrow>
                    <CheckCircleOutlineIcon color='success' {...commonProps}/>
                </Tooltip>
            );
        case ProblemBookmarkType.SuccessDifferently:
            return (
                <Tooltip title='다르게 풀 수도 있어요' arrow>
                    <DoneAllIcon color='primary' {...commonProps}/>
                </Tooltip>
            );
        default:
            return null;
    }
  };

  const bookmarkType = row?.bookmarkType as ProblemBookmarkType;

  const bookmarkIcon = bookmarkType ? (
    getIconByBookmarkType(bookmarkType, {onClick:()=>{row&&unbookmarkProblem({id:row.id});}, onMouseEnter:handlePopoverOpen})
  ) : (
    <BookmarkBorderIcon color="action" fontSize='large' sx={{ cursor: 'pointer', margin: 0, padding: 0 }} onClick={() => handleBookmarkClick(ProblemBookmarkType.Success)} onMouseEnter={handlePopoverOpen} />
  );
  return (
    <TableRow
    onMouseLeave={handlePopoverClose}
      //key={key}
      sx={{
        height: '80px',
        //cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // 마우스 오버 시 하이라이트 색상
        },
      }}
    >
      <TableCell component="th" scope="row" align="center" sx={{}}>
        {platform && (<img src={getImagePath(platform)} style={{ width: '100%', verticalAlign: 'middle' }} />)}
      </TableCell>
      <TableCell align="left" onClick={() => {
        if (row && onRowClick) {
          onRowClick(row.link);
        }

      }}
        sx={{
          cursor: 'pointer'
        }}
      >{title}</TableCell>
      <TableCell align="center">
        {
          row && level ? (
            <Tooltip title={"플랫폼 난이도 : " + difficulty} arrow>
              <Box>
                <Rating
                  size='medium'
                  name="half-rating-read"
                  value={level}
                  precision={0.1}
                  max={5}
                  readOnly
                />
              </Box>
            </Tooltip>
          ) : (<></>)
        }
      </TableCell>
      <TableCell align="center">
        <Badge
          onClick={() => {
            if (row) {
              navigate(PATH.PROBLEM(row.id.toString()));
            }

          }}

          badgeContent={postCount && postCount > 0 ? postCount : null}
          color="primary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          sx={{
            cursor: 'pointer',
            '& .MuiBadge-badge': {
              backgroundColor: '#f44336', // 빨간 배경색
              padding: 0,

              color: 'white', // 글자색
              fontSize: '0.8rem', // 폰트 크기

            }
          }}
        >
          {row && <ArticleOutlinedIcon color="action" fontSize="large" />}
        </Badge>
      </TableCell>
      <TableCell align='center'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, justifyContent:'center' ,position: 'relative' }}> {/* 아이콘을 수평으로 정렬 */}
          {row && bookmarkIcon}
          {open && (
            <Box
              sx={{
                position: 'absolute',
                left: 70,
                margin: 0, // 북마크 아이콘과 팝업 사이의 간격
                backgroundColor: 'white',
                boxShadow: 1,
                borderRadius: 1,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                gap: 1, // 아이콘 간 간격
                p: 1,
              }}
              onMouseLeave={handlePopoverClose}
            >
            {getIconByBookmarkType(ProblemBookmarkType.Unsolved)}
            {getIconByBookmarkType(ProblemBookmarkType.FailedCompletely)}
            {getIconByBookmarkType(ProblemBookmarkType.TooLong)}
            {getIconByBookmarkType(ProblemBookmarkType.Success)}
            {getIconByBookmarkType(ProblemBookmarkType.SuccessDifferently)}
            </Box>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">{platform &&
        ['swea'].includes(platform) && (
          <Tooltip title="해당 문제는 제공 사이트에서 직접 인증 후 열람 가능합니다." arrow>
            <LockIcon color="action" fontSize='large' />
          </Tooltip>
        )}</TableCell>
      <TableCell align="right">
        {row &&
          formatDistanceToNow(row.foundDate as Date, { addSuffix: true, includeSeconds: true, locale: ko })
        }
      </TableCell>
    </TableRow>
  );
};

export default ProblemRow;