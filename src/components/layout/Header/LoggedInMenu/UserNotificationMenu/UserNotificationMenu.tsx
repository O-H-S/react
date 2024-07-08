import React, { useState } from 'react';
import { IconButton, Menu, Badge, List, ListItem, ListItemText, SxProps, Theme } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import type { UserNotification } from '@/types/user';

import { useUserNotificationsQuery } from '@/hooks/api/account/useUserNotificationsQuery';
import { UserNotificationRow } from '../UserNotificationRow/UserNotificationRow';

interface UserNotificationProps {
    iconButtonSx?: SxProps<Theme>;

}

const UserNotificationMenu: React.FC<UserNotificationProps> = ({
    iconButtonSx,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
    } = useUserNotificationsQuery();

    const notifications = data?.pages.flatMap(page => page.notifications) ?? [];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <>
            <IconButton
                onClick={handleClick}
                size="large"
                aria-label="show new notifications"
                color="inherit"
                sx={iconButtonSx}
            >
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                id="menu-notifications"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    {isLoading ? (
                        <ListItem>
                            <ListItemText primary="Loading notifications..." />
                        </ListItem>
                    ) : isError ? (
                        <ListItem>
                            <ListItemText primary="Could not load notifications." />
                        </ListItem>
                    ) : (
                        notifications.map(notification => !notification.viewed && (
                            <ListItem button key={notification.id} onClick={handleClose}>
                                <UserNotificationRow notification={notification} />
                            </ListItem>
                        ))
                    )}
                    {hasNextPage && (
                        <ListItem button onClick={() => fetchNextPage()}>
                            <ListItemText primary="Load More" />
                        </ListItem>
                    )}
                </List>
            </Menu>
        </>
    );
};

export default UserNotificationMenu;
