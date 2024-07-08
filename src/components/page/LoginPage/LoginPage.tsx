import { useNavigate } from "react-router-dom";

import { useState } from "react";


import NaverLogin from '@assets/login/naver_login.png';
import GoogleLogin from '@assets/login/google_login.png';
import KakaoLogin from '@assets/login/kakao_login.png'



import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { ReactComponent as LogoImage } from '@assets/logo.svg';

import { PATH } from '@constants/path';


import { useLogin } from "@/hooks/api/account/useLogin";

import { enqueueSnackbar } from "notistack";
import { useShakeAnimation } from "@/hooks/design/useShakeAnimation";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const disableLoading = () => {
    setLoading(false);
  }
  const { login } = useLogin(disableLoading);
  const [loading, setLoading] = useState(false);

  const { shakeStyle: shakeStyle_ID, triggerShake: triggerShake_ID } = useShakeAnimation();
  const { shakeStyle: shakeStyle_Password, triggerShake: triggerShake_Password } = useShakeAnimation();

  const tryLogin = () => {
    if (!id) {
      triggerShake_ID();
      enqueueSnackbar('ID가 비어있습니다.', {
        preventDuplicate: true,
        variant: "warning"
      });
      return;
    }
    if (!password) {
      triggerShake_Password();
      enqueueSnackbar('비밀번호가 비어있습니다.', {
        preventDuplicate: true,
        variant: "warning"
      });
      return;
    }
    setLoading(true);
    login({ id, password });
  };


  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      tryLogin();
    }
  };
  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="id" label="ID" value={id} css={shakeStyle_ID} onChange={(e) => setId(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          css={shakeStyle_Password}
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ mt: 0, mb: 5 }}>

          <Link component="button" variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => navigate(PATH.REGISTER)} >
            회원가입
          </Link>
        </Typography>

      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={loading}
        onClick={tryLogin}
      >
        로그인
      </LoadingButton>
    </>
  );


  return (
    <>
      <Button
        onClick={() => navigate(PATH.ROOT)}
        variant="contained"
        size="large"
        color="inherit"
        sx={{ margin: 3 }}
      >
        <ArrowBackIcon />
      </Button>
      <Box
        sx={{
          margin: 2,
          height: 1,
        }}
      >

        <Stack alignItems="center" justifyContent="center" onKeyDown={handleKeyDown} sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h5">환영합니다</Typography>

            <Typography variant="body2" sx={{ textAlign: "right", mt: 3, mb: 3 }}>
              다른 계정으로 로그인(회원가입)
            </Typography>

            <Stack direction="column" alignItems={"center"} spacing={0}>
              <IconButton
                
                href={process.env.REACT_APP_API_URL + "api/oauth2/authorization/google"}
                sx={{
                  width: '80%',
                  height: 'auto',
                  borderRadius: 0,

                }}       
              >
                <img src = {GoogleLogin}  style={{ width: '100%', height: 'auto' }}></img>
              </IconButton>

              <IconButton
                href= {process.env.REACT_APP_API_URL + "api/oauth2/authorization/naver"}         
                sx={{
                  width: '80%',
                  height: 'auto',
                  borderRadius: 0,

                }}  
              >
                <img src = {NaverLogin} style={{ width: '100%', height: 'auto' }}></img>
              </IconButton>

              <IconButton
                href={process.env.REACT_APP_API_URL + "api/oauth2/authorization/kakao"}
                sx={{
                  width: '80%',
                  height: 'auto',
                  borderRadius: 0,

                }}     
              >
                <img src = {KakaoLogin} style={{ width: '100%', height: 'auto' }}></img>
              </IconButton>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            {renderForm}

          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default LoginPage;
