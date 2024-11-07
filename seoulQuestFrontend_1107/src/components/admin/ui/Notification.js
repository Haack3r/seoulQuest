import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarningIcon from '@mui/icons-material/Warning';

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = [
    {
      id: 1,
      icon: <MailIcon color="primary" />,
      primary: "New Message Received",
      secondary: "2 hours ago",
      type: "message"
    },
    {
      id: 2,
      icon: <AddCircleIcon color="success" />,
      primary: "New Application Submitted",
      secondary: "3 hours ago",
      type: "application"
    },
    {
      id: 3,
      icon: <WarningIcon color="warning" />,
      primary: "System Warning",
      secondary: "5 hours ago",
      type: "warning"
    },
  ];
  // example 코드

  return (
    <div>
      {/* 알람 버튼 */}
      <IconButton
        aria-label="show notifications"
        aria-controls={open ? 'notification-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Badge badgeContent={notifications.length} color="error"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.75rem',
            },
          }}
        > {/* badgecontent 나중에 count 코드로 적용해보기 */}
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* 알림 리스트 팝업 */}
      <Menu
        className="hidden lg:block"
        id="notification-menu"
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
        PaperProps={{
          sx: {
            maxHeight: '70vh',
            width: '320px',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '3px',
            }
          }
        }}
        disableScrollLock={true}
      >
        {/* <Typography
          variant="subtitle1"
          sx={{ p: 2, fontWeight: 600, borderBottom: '1px solid #eee' }}
        >
          Notifications
        </Typography> */}

        <List sx={{ width: '300px', maxWidth: 360 }}>
          {/* 첫 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <MailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="你收到了 14 份新闻报告" secondary="2 年前" />
          </ListItem>
          <Divider />

          {/* 두 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <MailIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="你推荐的 曲妮妮 已通过第三轮面试" secondary="2 年前" />
          </ListItem>
          <Divider />

          {/* 세 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="这种模板可以区分多种通知类型" secondary="2 年前" />
          </ListItem>
          <Divider />

          {/* 네 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="左侧图标用于区分不同的类型" secondary="2 年前" />
          </ListItem>
          <Divider />

          {/* Footer 부분 */}
          <MenuItem onClick={handleClose}>
            Clear Notification
          </MenuItem>
          <MenuItem onClick={handleClose}>
            View more
          </MenuItem>
        </List>
      </Menu>
    </div>
  );
};

export default NotificationMenu;
