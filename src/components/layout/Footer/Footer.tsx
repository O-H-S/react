import React from 'react';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Stack
      spacing={3}
      component="footer"
      sx={{
        mt: 'auto', // margin top auto for pushing footer to the bottom
        //backgroundColor: 'background.paper', // use theme's paper color
        textAlign: 'center', // center the text

      }}
      
    >
      <Divider />
      <Typography variant="body2" color="gray">
        Contact : <Link href="mailto:ohhyunsu0606@gmail.com">ohhyunsu0606@gmail.com</Link>
      </Typography>
      <Typography variant="body2" color="gray">웹 개발 학습 목적의 개인 웹사이트입니다.</Typography>
    </Stack>
  );
};

export default Footer;
