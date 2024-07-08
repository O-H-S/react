
import { Suspense, useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, TablePagination } from '@mui/material';
import { useProblemsSuspenseQuery } from '@/hooks/api/problem/useProblemsSuspenseQuery';
import { useNavigate } from 'react-router-dom';

import type { ProblemPaginationForm } from '@/api/problem/getProblems';

import ProblemRow from '@/components/service/problem/ProblemRow';
import InfoIcon from '@mui/icons-material/Info'; //
import { ErrorBoundary } from 'react-error-boundary';

const ProblemList = ({form, onLoad} : {form:ProblemPaginationForm, onLoad:any}) =>{

    const {problemsData} = useProblemsSuspenseQuery(form);
    const navigate = useNavigate();

    onLoad(problemsData);

    const handleRowClick = (link:string) => {
        window.open(link, '_blank'); // 새 창 또는 탭에서 링크 열기
      };


    return (
        <>
            {problemsData.data.map((row) => (
                <ProblemRow key={row.id} row={row} onRowClick={handleRowClick} />
            ))}
        </>
    );
}

const ProblemListSkeleton = ({pageSize}:{pageSize:number}) =>{


    return (
        <>
            {Array.from({ length: pageSize }).map((_, index) => (
                <ProblemRow key={"dummy" + index} />
            ))}
        </>
    );
}



const ProblemTable = ({keywords, platforms, sort, isDescending, levelRange} : {keywords?:string, platforms?:string[], sort?:string, isDescending?:boolean, levelRange?:number[]}) => {
    // 상태 추가
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const [totalCounts, setTotalCounts] = useState(0);
    const minLevel = levelRange ? Math.min(levelRange[0], levelRange[1]) : undefined;
    const maxLevel = levelRange ? Math.max(levelRange[0], levelRange[1]) : undefined;
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        // 여기서 API를 호출하여 데이터를 다시 가져옵니다. 예: useProblemsQuery({page: newPage, pageSize: rowsPerPage});
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        // 데이터 가져오기 API를 호출하여 페이지 사이즈를 업데이트 합니다.
    };

    useEffect(() => {
        setPage(0);
        // Optionally, make an API call here to fetch data with the new keywords and reset page
        // useProblemsQuery({ page: 0, pageSize: rowsPerPage, keywords });
    }, [keywords,platforms, sort, isDescending, levelRange]);

    
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
                        <TableCell align="center" sx={{ width: '15%' }}>플랫폼</TableCell>
                        <TableCell align="center" sx={{ width: '30%' }}>제목</TableCell>
                        <TableCell align="center">난이도</TableCell>
                        <TableCell align="center" sx={{ width: '10%' }}>토론</TableCell>
                        <TableCell align="center" sx={{}} >북마크
                            <Tooltip title={<>토론 알림을 받을 수 있습니다.<br />문제의 진행도를 기록합니다.</>} arrow>
                                <InfoIcon sx={{ height:20, verticalAlign: 'middle' }}  />
                            </Tooltip>
                        </TableCell>
                        <TableCell align="center">접근성</TableCell>
                        <TableCell align="right"> 수집일
                        <Tooltip title="서버의 데이터 수집 시점 기준 " arrow>
                            <InfoIcon sx={{ height:20, verticalAlign: 'middle' }}  />
                        </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ErrorBoundary fallback={(<ProblemListSkeleton pageSize = {rowsPerPage} />)}>
                        <Suspense fallback = { <ProblemListSkeleton pageSize = {rowsPerPage} />}>
                            <ProblemList form = {{page, pageSize:rowsPerPage, keywords, platforms, sort, isDescending, minLevel, maxLevel }} onLoad = {(data:any)=>setTotalCounts(data.totalCounts)}/>
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
                labelRowsPerPage={'문제 수'}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
  };
  
  export default ProblemTable;