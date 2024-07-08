import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/* emotion으로 전역 스타일 적용 */

// import './index.css'; -> Webpack(css-loader) 의해 지원 되는 기능.

import '@fontsource/roboto/300.css'; // Light
import '@fontsource/roboto/400.css'; // Regular
import '@fontsource/roboto/500.css'; // Medium
import '@fontsource/roboto/700.css'; // Bold

import '@fontsource/noto-sans-kr/300.css';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/500.css';
import '@fontsource/noto-sans-kr/700.css';

// 전역 스타일 정의
const globalStyles = <GlobalStyles styles={{ 

  
    // 기타 전역적으로 적용하고 싶은 스타일
  }} />;

// 테마 정의
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 블루
    },
    secondary: {
      main: '#9c27b0', // 퍼플
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#f57c00',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },

    action:{
      selected: '#1976D2'
      
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Noto Sans KR',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'none',
    },
  },

  shape: { borderRadius: 8 },
});



type CustomThemeProviderProps = PropsWithChildren;

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => { 

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;