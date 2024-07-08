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

import { InputAdornment } from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useShakeAnimation } from '@/hooks/design/useShakeAnimation';
import { enqueueSnackbar } from "notistack";
import { useRegister } from '@/hooks/api/account/useRegister';
import { HTTPError } from '@/api/HTTPError';

const RegisterPage = () => {
  const navigate = useNavigate();
  const disableLoading = () => {
    setLoading(false);
  }


  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


  const [loading, setLoading] = useState(false);

  const { shakeStyle: shakeStyle_ID, triggerShake: triggerShake_ID } = useShakeAnimation();
  const { shakeStyle: shakeStyle_Nickname, triggerShake: triggerShake_Nickname } = useShakeAnimation();
  const { shakeStyle: shakeStyle_Email, triggerShake: triggerShake_Email } = useShakeAnimation();
  const { shakeStyle: shakeStyle_Password, triggerShake: triggerShake_Password } = useShakeAnimation();
  const { shakeStyle: shakeStyle_Password2, triggerShake: triggerShake_Password2 } = useShakeAnimation();


  const tryRegister = () => {
    if (!id) {
      triggerShake_ID();
      enqueueSnackbar('ID가 비어있습니다.', {
        preventDuplicate: true,
        variant: "warning"
      });
      return;
    }
    if (!nickname) {
      triggerShake_Nickname();
      enqueueSnackbar('닉네임이 비어있습니다.', {
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
    if (!password2 ) {
      triggerShake_Password2();
      enqueueSnackbar('비밀번호 확인란이 비어있습니다.', {
        preventDuplicate: true,
        variant: "warning"
      });
      return;
    }

    if(password != password2){
      triggerShake_Password2();
      enqueueSnackbar('비밀번호를 다시 확인해주세요.', {
        preventDuplicate: true,
        variant: "warning"
      });
      return;
    }

    setLoading(true);
    register({ username:id, password, password2, email, nickname });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      tryRegister();
    }
  };

  const {register} = useRegister((error: any)=>{

    if((error as HTTPError).code == "C001"){

      if('username' in error.data)
        enqueueSnackbar(`ID : ${error.data['username']}`, { variant: 'error' });
      if('nickname' in error.data)
        enqueueSnackbar(`닉네임 : ${error.data['nickname']}`, { variant: 'error' });
      if('password' in error.data )
        enqueueSnackbar(`비밀번호 : ${error.data['password']}`, { variant: 'error' });

      //Object.entries(error.data).forEach(([field, message]) => {
      //  enqueueSnackbar(`${field} : ${message}`, { variant: 'error' });
      //});
      return;
    }

    if((error as HTTPError).code == "A001"){
      enqueueSnackbar(`${error.data}`, { variant: 'error' });
      return;
    }
    //enqueueSnackbar(`${field} 오류: ${message}`, { variant: 'error' });
      enqueueSnackbar('회원가입 실패 (' + error.message + ")", {
        variant:'error'
    });

  } ,disableLoading);

  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        size="large"
        color="inherit"
        sx={{ margin: 3 }}
      >
        <ArrowBackIcon />
      </Button>

      <Box
        sx={{
          margin: 13,
          height: 1,
        }}
      >

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}  onKeyDown={handleKeyDown}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h5">계정 만들기</Typography>

            <Stack spacing={3} sx={{ mt: 5, mb:5 }}>
              <TextField name="id" label="ID" value={id} css={shakeStyle_ID} onChange={(e) => setId(e.target.value)} />
              <TextField name="nickname" label="닉네임" value={nickname} css={shakeStyle_Nickname} onChange={(e) => setNickname(e.target.value)} />

              <TextField
                name="password"
                label="비밀번호"
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

              <TextField
                name="password2"
                label="비밀번호 확인"
                css={shakeStyle_Password2}
                value={password2}
                type={showPassword2 ? 'text' : 'password'}
                onChange={(e) => setPassword2(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                        {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              loading={loading}
              onClick={tryRegister}
            >
              회원가입
            </LoadingButton>





          </Card>
        </Stack>
      </Box>



    </>);
}

export default RegisterPage;