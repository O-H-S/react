
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { PATH } from '@constants/path';
const LoggedOutMenu = () => {
    const navigate = useNavigate();
  
    return (
        <Button type="button" size ="large" variant="outlined" color="inherit" onClick={() => navigate(PATH.LOGIN)} >로그인</Button>
    );
  };
  
  export default LoggedOutMenu;