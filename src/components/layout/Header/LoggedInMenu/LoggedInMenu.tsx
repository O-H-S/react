import { useUserDataSuspenseQuery } from "@/hooks/api/account/useUserDataSuspenseQuery";
import { Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography, IconButton, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { useState, useLayoutEffect } from "react";
import { useLogOutMutation } from "@/hooks/api/account/useLogOutMutation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { PROFILE } from '@/constants/api';
import UserNotificationMenu from "./UserNotificationMenu/UserNotificationMenu";
import { UserNotification } from "@/types/user";
import { useAdminLogin } from "@/hooks/api/account/useAdminLogin";

const LoggedInMenu = () => {
    const navigate = useNavigate();
    const {userData} = useUserDataSuspenseQuery();
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const open = Boolean(anchorEl);


    const handlerAdminLoginSuccess  = () =>{
        alert("로그인 성공");
        setOpenPasswordModal(false);
        navigate(PATH.ROOT);
        
    };
    const handlerAdminLoginFailed  = () =>{
        alert("로그인 실패");
    };
    const {adminLogin} = useAdminLogin({onSuccess:handlerAdminLoginSuccess, onError:handlerAdminLoginFailed});


    const logOutMutation = useLogOutMutation();

    useLayoutEffect(() => {
        if (!userData) {
          throw new Error("User data is not available.");
        }
    }, [userData]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        setAnchorEl(null);
        navigate(PATH.PROFILE);
    };

    const handleAdmin = () => {
        setAnchorEl(null);
        setOpenPasswordModal(true);
    };

    const handleLogOut = () => {
        logOutMutation.mutate();
        setAnchorEl(null);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordSubmit = () => {
        adminLogin({adminKey:password})
        //setOpenPasswordModal(false);

    };

    const handlePasswordModalClose = () => {
        setOpenPasswordModal(false);
    };


    return (
        <>
            <UserNotificationMenu iconButtonSx={{mr:4}}  />

            <IconButton
                onClick={handleClick}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-account"
                aria-haspopup="true"
                color="inherit"
            >
                <Avatar src={PROFILE(userData?.profileImage)} sx={{ width: 55, height: 55}} />
            </IconButton>

            <Menu
                id="menu-account"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>프로필</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleAdmin}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>관리자</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>로그아웃</ListItemText>
                </MenuItem>
            </Menu>

            <Dialog open={openPasswordModal} onClose={handlePasswordModalClose}>
                <DialogTitle>관리자 로그인</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        인증을 위해 비밀번호를 입력하세요
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="비밀번호"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePasswordModalClose}>취소</Button>
                    <Button onClick={handlePasswordSubmit}>확인</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LoggedInMenu;
