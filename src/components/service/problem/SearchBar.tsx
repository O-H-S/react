import React, { useState } from 'react';
import { Container, Stack, TextField, Button, Collapse, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const SearchBar = ({ onSearch, onClickOption, showOption }:any) => {
    const [searchTerm, setSearchTerm] = useState('');
    //const [showAdvanced, setShowAdvanced] = useState(false);
    const handleSearch = () => {
      onSearch(searchTerm);
    };
    const handleOption = () => {
      onClickOption();
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onSearch(searchTerm);
      }
    };
  
    return (
      <Stack direction="row" spacing={2} alignItems="center" width="100%">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="제목을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button 
          onClick={() => handleOption()}
          endIcon={showOption ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          variant='outlined'
          sx={{ minWidth:'90px', height: '100%' }}  // 왼쪽으로 이동
        >
          옵션
        </Button>

        <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />} sx ={{minWidth:'90px',height: '100%'}} >
          검색
        </Button>
      </Stack>
    );
  };

  export default SearchBar;