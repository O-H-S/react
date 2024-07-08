import { Box, Container, Typography, TextField, Button, Avatar, Stack, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab'; // 이미지 업로드 시 로딩 표시용
import { useState } from 'react';
import { useUserDataSuspenseQuery } from '@/hooks/api/account/useUserDataSuspenseQuery';
import { useUserDataPatchMutation } from '@/hooks/api/account/useUserDataPatchMutation';
import type { UserData } from '@/types/user';
import UndoIcon from '@mui/icons-material/Undo';
import { useTheme } from '@mui/material/styles';
import { useProfileImageUpload } from '@/hooks/api/account/useProfileImageUpload';
import { useSnackbar } from 'notistack';

import { PROFILE } from '@/constants/api';

function formatDate(date:Date) {
  const year = date.getFullYear(); // 년도
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다)
  const day = date.getDate(); // 일

  // 각 부분을 문자열로 변환하고, 두 자릿수로 맞추어 포맷팅합니다.
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}



const ProfilePage = () => {
    
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()


  const {userData } = useUserDataSuspenseQuery();
  const patchMutation = useUserDataPatchMutation('me');
  

  const [profile, setProfile] = useState<UserData>({
      ...userData
    });

  const checkChanges = () => {
      for (const key in profile) {
          if ( key in userData&& profile[key as keyof UserData] != userData[key as keyof UserData]) {
            //console.log("diff:",key)
            return true;
          }
      }
      return false;
  }
    

    // 프로필 이미지 관련
    const uploader = useProfileImageUpload();
    const [imageUrl, setImageUrl] = useState(PROFILE(userData.profileImage));
    const [uploading, setUploading] = useState(false); // 이미지 업로드 상태

      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setProfile({
          ...profile,
          [name]: value,
        });
      };
    
      const handleImageChange = (e:any) => {
        const file = e.target.files[0];
        if (file) {

          uploader(file).then((profileKey:string)=>{
            enqueueSnackbar('프로필 이미지가 변경되었습니다', {variant:'success'});
            profile.profileImage = profileKey;
            setImageUrl(PROFILE(profile.profileImage) + `?${new Date().getTime()}`);
          })
          //setImage(URL.createObjectURL(file));
        }
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
        let changes:any = {}
        if(profile.nickname != userData.nickname)
            changes["nickname"] = profile.nickname;
        if(profile.email != userData.email)
            changes["email"] = profile.email;
        if(profile.profileImage != userData.profileImage)
          changes["profileImage"] = profile.profileImage;
        patchMutation.mutate(changes);


        /*
        setUploading(true);
    
        // 여기에 프로필 업데이트 로직 구현
        console.log('Updating profile...', profile);
        
        // 가정: 이미지 업로드에 시간이 걸린다고 가정
        setTimeout(() => {
          setUploading(false);
        }, 2000);
        */
      };
      

      return (
        <Container maxWidth="sm" sx={{  marginTop:10, marginBottom:10 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack spacing={3} alignItems={'center'}>
                <Box sx={{  display: 'flex', justifyContent: 'center' }}>
                <Avatar src={imageUrl} sx={{ width: 200, height: 200, border:profile.profileImage !== userData.profileImage? '2px solid #F57C00': '0px solid black' }} />
                 
                </Box>
                <Button variant="contained" component="label" sx={{ paddingRight:5, paddingLeft:5, maxWidth: 'fit-content' }}>
                    변경
                    <input type="file" hidden onChange={handleImageChange} />
                </Button>
            
                <Stack direction="row" sx={{ width: '100%' }} spacing={1} alignItems="center">
                    <TextField
                    required
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (profile.nickname !== userData.nickname) ?  '#F57C00': theme.palette.action.disabled,
                        },
                    }}
                    id="nickname"
                    label="닉네임"
                    name="nickname"
                    autoComplete="nickname"
                    value={profile.nickname}
                    onChange={handleInputChange}
                    />
                    <IconButton ><UndoIcon /></IconButton>
                </Stack>

                <Stack direction="row" sx={{ width: '100%' }} spacing={1} alignItems="center">
                    <TextField
                        required
                        fullWidth
                        id="email"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: (profile.email !== userData.email) ?  '#F57C00': theme.palette.action.disabled,
                            },
                        }}
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        value={profile.email}
                        onChange={handleInputChange}
                    />
                    <IconButton ><UndoIcon /></IconButton>
                </Stack>
              {/* 가입일 표시 */}
              <Typography variant="body1" color="textSecondary">
                가입일: {formatDate(new Date(userData.createDate))}
              </Typography>
              <LoadingButton
                type="submit"
                fullWidth
                disabled={!checkChanges()}
                variant="contained"
                loading={uploading}
              >
                변경 사항 저장
              </LoadingButton>
            </Stack>
          </Box>
        </Container>
      );
}

export default ProfilePage;