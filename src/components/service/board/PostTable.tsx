
import { useNavigate } from "react-router-dom";
import { PostRowSkeleton, PostRow } from "./PostRow";


import { Suspense, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, TablePagination } from '@mui/material';
import { useProblemsSuspenseQuery } from '@/hooks/api/problem/useProblemsSuspenseQuery';

import ProblemRow from '@/components/service/problem/ProblemRow';
import InfoIcon from '@mui/icons-material/Info'; //
import { ErrorBoundary } from 'react-error-boundary';

/*
const PostList = ({ page , pageSize, onLoad} : {page:any, pageSize:any, onLoad:any}) =>{
    const {postsData} = usePostsQuery({page, pageSize});
    const navigate = useNavigate();

    onLoad(postsData);

    const handleRowClick = (link:string) => {
        window.open(link); // 새 창 또는 탭에서 링크 열기
      };


    return (
        <>
            {postsData.data.map((id) => (
                <PostRow key={id} postId={id} onRowClick={handleRowClick} />
            ))}
        </>
    );
}
*/
const PostListSkeleton = ({pageSize}:{pageSize:number}) =>{
    return (
        <>
            {Array.from({ length: pageSize }).map((_, index) => (
                <PostRowSkeleton key={"dummy" + index} />
            ))}
        </>
    );
}


const PostTable = ({ListComponent, listComponentProps={}, initialPage=0, initialPageSize=10, onPageChange}:{ListComponent : React.ElementType, listComponentProps:{}, initialPage?:number,initialPageSize?:number, onPageChange?:any}) => {
    // 상태 추가
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialPageSize);
    const [totalCounts, setTotalCounts] = useState(0);
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        if(onPageChange)
            onPageChange(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPageSize = parseInt(event.target.value, 10);
        setRowsPerPage(newPageSize);
        setPage(0);
        if(onPageChange)
            onPageChange(0, newPageSize);

    };

    
    return (
        <TableContainer sx={{width:'100%',  maxWidth: '100%', border: '1px solid #e0e0e0', borderRadius: '10px' }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead >
                    <TableRow sx={{
                        '& th': {
                            fontWeight: 'bold',
                            fontSize: 13,
                            color:"gray",
                            padding: '6px 20px'
                        },
                    }}>
                        <TableCell align="center" sx={{ width: '5%' }}>번호</TableCell>
                        <TableCell align="center" sx={{ width: '30%' }}>제목</TableCell>
                        <TableCell align="center" sx={{ width: '10%' }}>작성자</TableCell>
                        <TableCell align="center" sx={{ width: '5%' }}>추천수</TableCell>
                        <TableCell align="center" sx={{ width: '5%' }}>조회수</TableCell>
                        <TableCell align="center" sx={{ width: '7%' }}>작성일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ErrorBoundary fallback={(<PostListSkeleton pageSize = {rowsPerPage} />)}>
                        <Suspense fallback = { <PostListSkeleton pageSize = {rowsPerPage} />}>
                            <ListComponent {...listComponentProps} page={page} pageSize ={rowsPerPage} onLoad = {(data:any)=>setTotalCounts(data.totalCounts)}/>
                        </Suspense>
                    </ErrorBoundary>
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={totalCounts} // 전체 데이터 수
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={'게시글 수'}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
  };
  
  export default PostTable;









