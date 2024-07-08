import { useProblemSuspenseQuery } from "@/hooks/api/problem/useProblemSuspenseQuery";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, CardActions, Typography, IconButton, Button, Stack, Divider, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostTable from "@/components/service/board/PostTable";
import { ProblemPostList } from "@/components/service/problem/ProblemPostList";
import { PATH } from "@/constants/path";
import { useRecoilValue } from "recoil";
import { loggedIn } from "@/store/auth";
import { ArrowBack } from "@mui/icons-material";

const ProblemPage = () => {
  const isLoggedIn = useRecoilValue(loggedIn);
  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve problem data
  const problemData = useProblemSuspenseQuery(parseInt(id as string));

  // Navigate back handler
  const handleBack = () => {
    navigate(-1);
  };

  // Write post button handler
  const handleWriteClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 게시글을 작성할 수 있습니다.");
    } else {
      navigate(PATH.POST_WRITE, { state: { targetProblem: id } });
    }
  };

  return (

<>
    <Button variant="contained" onClick={handleBack} style={{marginLeft:40, marginTop:20}}>
      <ArrowBack fontSize="large" />
    </Button>


    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       {/* Main Card */}
       <Card raised sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{problemData?.title}</Typography>
            
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">
            {'문제에 대해 자유롭게 토론하세요'}
          </Typography>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="flex-end" sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWriteClick}
          >
            글 작성
          </Button>
        </Box>
      <PostTable
        ListComponent={ProblemPostList}
        listComponentProps={{ problemId: problemData?.id }}
      />
    </Container>
    </>
  );
};

export default ProblemPage;
