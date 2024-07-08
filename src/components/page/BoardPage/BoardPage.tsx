import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useBoardSuspenseQuery } from "@/hooks/api/board/useBoardSuspenseQuery";
import { PATH } from "@/constants/path";
import { useEffect } from "react";
import PostTable from "@/components/service/board/PostTable";
import PostList from "@/components/service/board/PostList";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { loggedIn } from "@/store/auth";
import { ArrowBack } from "@mui/icons-material";
import { ProblemPostTagPrefix } from "@/constants/service";

const tagWrapper = (tagName : string, tagType:string) => {
  if(tagType === 'system'){
      return tagName.replace(ProblemPostTagPrefix, '') + "번";
  }
  return tagName;
};



const BoardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const boardData = useBoardSuspenseQuery(id);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '0', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const isLoggedIn = useRecoilValue(loggedIn);

  const writable = boardData.writable && ( boardData.writableMethods.includes('*') || boardData.writableMethods.includes('direct'));
  // 페이지 또는 페이지 크기가 변경되면 URL 업데이트
  const updateURLParams = (newPage: number, newPageSize: number) => {
    setSearchParams({ page: newPage.toString(), pageSize: newPageSize.toString() });
  };

  // id는 필수 값으로 설정되기 때문에 항상 값이 존재한다.
  useEffect(() => {
    if (!id) {
      navigate(PATH.ROOT);
    }
  }, [id, navigate]);

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 게시글을 작성할 수 있습니다.");
    } else {
      navigate(PATH.POST_WRITE, { state: { targetBoard: id } });
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

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        <Box mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            {boardData?.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {boardData?.description}
          </Typography>
          <Divider sx={{ my: 2 }} />

        </Box>

        {writable&& 
          (<Box display="flex" justifyContent="flex-end" sx={{ mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleWriteClick}
            >
              글 작성
            </Button>
        </Box>)
        }

        <PostTable
          ListComponent={PostList}
          listComponentProps={{ boardId: boardData?.id, rowProps:{tagWrapper} }}
          initialPage={page}
          initialPageSize={pageSize}
          onPageChange={updateURLParams}
        />

      </Container>
    </>
  );
};

export default BoardPage;