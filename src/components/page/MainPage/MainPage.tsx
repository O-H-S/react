
import { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, TablePagination, Collapse, Button, Chip } from '@mui/material';
import { useProblemsSuspenseQuery } from '@/hooks/api/problem/useProblemsSuspenseQuery';

import { Stack } from '@mui/material';
import ProblemRow from '@/components/service/problem/ProblemRow';
import InfoIcon from '@mui/icons-material/Info'; //
import ProblemTable from '@/components/service/problem/ProblemTable';
import SearchBar from '@/components/service/problem/SearchBar';
import AdvancedSearchMenu from '@/components/service/problem/AdvancedSearchMenu';
import { Console } from 'console';


const MainPage = () => {
  // 상태 추가
  const [keywords, setKeywords] = useState<undefined | string>(undefined);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedAll, setSelectedAll] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sort, setSort] = useState<{key:string, isDescending:boolean}|undefined>(undefined);

  const [lastLevelRange, setLastLevelRange]= useState<number[]>([0, 5]);



  const handleSearch = (searchTerm: string) => {
    setKeywords(searchTerm);
  };
  const handleOption = () => {
    setShowAdvanced(!showAdvanced);
  };
  const handleChangePlatform = (platform:any, platformList : string[]) => {
      const newList = selectedPlatforms.includes(platform) ? selectedPlatforms.filter(p => p !== platform) : [...selectedPlatforms, platform];
      if(newList.length == platformList.length || newList.length == 0){
        setSelectedPlatforms([]);
        setSelectedAll(true);
      }

      else{
        setSelectedAll(false);
        setSelectedPlatforms(newList);
      }
      
  }

  const handleChangeAllPlatform = () => {
      if (!selectedAll) {
        setSelectedPlatforms([]);
        setSelectedAll(true);
    } 
  }

  const handleChangeSort = (newSort:any) =>{
    setSort(newSort);
    //console.log("sort changed");
    
  }

  const handleChangeRange = (newRange:number[], finished:boolean) =>{
    if(finished)
      setLastLevelRange(newRange);

  }

  const handleDeleteKeyword = () => {
    setKeywords(undefined);
  };

  return (
    <Container sx={{
      paddingTop: 10, paddingBottom: 10,
      //marginLeft: '10%', 
      //marginRight: '10%', 
      width: '80%', // 전체 너비에서 10%씩 뺀 값
      //alignContent:'center',
    }}>

      <Stack width={'100%'} direction={'column'} spacing={3} alignItems={'center'} >

        <Stack width="100%" direction="row" justifyContent="flex-start">
          <SearchBar onSearch={handleSearch} onClickOption={handleOption} showOption={showAdvanced} />

        </Stack>
        <Collapse in={showAdvanced} timeout="auto" unmountOnExit>
          <AdvancedSearchMenu 
          selectedPlatforms={selectedPlatforms} selectedAll={selectedAll} onChangePlatform={handleChangePlatform} onChangeAllPlatform = {handleChangeAllPlatform}
          onChangeSort = {handleChangeSort} sort ={sort}
          onChangeLevelRange= {handleChangeRange} lastLevelRange ={lastLevelRange}
          
          />
        </Collapse>

        {keywords && (
          <Stack width="100%" direction="row" justifyContent="flex-start">
            <Chip
              label={keywords}
              variant='outlined'
              onDelete={handleDeleteKeyword}
              //sx={{ marginBottom: 2 }}
            />
          </Stack>
        )}

        <ProblemTable keywords={keywords} platforms={selectedAll?undefined:selectedPlatforms} sort={sort?sort.key:undefined} isDescending={sort?sort.isDescending:undefined} levelRange ={lastLevelRange}/>

      </Stack>

    </Container>
  );
};

export default MainPage;