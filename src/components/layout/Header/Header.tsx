import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoggedOutMenu from './LoggedOutMenu/LoggedOutMenu';
import LoggedInMenu from './LoggedInMenu/LoggedInMenu';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PATH } from '@constants/path';

const EmptyComponent = () => <></>;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname;


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
          <Toolbar>

        

            <Box sx={{ ml : "20%", display: 'flex', alignItems: 'center'}} gap={1}>
              
              <Box sx ={{ margin:1 , width:55, height:55 , cursor: 'pointer'}} onClick={() => navigate(PATH.ROOT)} >
                <img src="/favicon.png" alt="Favorite" style ={{ width:"100%", height:"100%" }} />
              </Box>

              {/* 
              <Typography
                variant="h5"
                component="div"
                fontSize={35}
                sx={{ cursor: 'pointer', 
                marginRight:3,
                
                ':hover': {
                  //textDecoration: '' 
                  color: 'secondary.main', 
                } }}
                onClick={() => navigate(PATH.ROOT)}
              >
                
              </Typography>

              */}

              <Button
                color="inherit"  
                variant='text'   
                onClick={() => navigate(PATH.ROOT)}
              >
                홈
              </Button>

              <Button
                color="inherit"  
                variant='text'   
                onClick={() => navigate(PATH.COMMUNITY)}
              >
                커뮤니티
              </Button>
            </Box>

            {/* 로그인/로그아웃 메뉴를 오른쪽에 배치하는 Box */}
            <Box sx={{ mr:"20%", marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <ErrorBoundary FallbackComponent={LoggedOutMenu}>
                <Suspense fallback={<LoggedOutMenu/>}>
                  <LoggedInMenu/>
                </Suspense>
              </ErrorBoundary>
            </Box>

            
          </Toolbar>
        </AppBar>
      );
};

export default Header;