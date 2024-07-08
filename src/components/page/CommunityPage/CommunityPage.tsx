import { Container, Grid, Typography, Paper, Box } from "@mui/material";
import BoardPostSummary from "@/components/service/board/BoardPostSummary";
import { Masonry } from "@mui/lab";

const CommunityPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
         <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>

          <BoardPostSummary boardId={"notice"} sx={{backgroundColor:"ivory"}} rowSx={{bgcolor:'transparent'}} />
          <BoardPostSummary boardId={"problem"} />
          <BoardPostSummary boardId={"free"} />



        </Masonry>
{/*
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} >

          <BoardPostSummary boardId={"notice"} sx={{ backgroundColor: "ivory" }} />

        </Grid>
        <Grid item xs={12} md={6} >

          <BoardPostSummary boardId={"problem"} />

        </Grid>
        <Grid item xs={12} md={6}>

          <BoardPostSummary boardId={"free"} />

        </Grid>
      </Grid>
       */}
    </Container>
    
  );
};

export default CommunityPage;