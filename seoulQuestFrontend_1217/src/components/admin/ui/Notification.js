import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
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
        <Badge badgeContent={5} color="error"> {/* badgecontent 나중에 count 코드로 적용해보기 */}
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* 알림 리스트 팝업 */}
      <Menu
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
        keepMounted={true}
        disableScrollLock={true}
        PopoverClasses={{
          root: { 'notification-popover': 'fixed' }
        }}
        PaperProps={{
          style: {
            marginTop: '13px',
          },
        }}
      >
        <List sx={{ width: '300px', maxWidth: 360 }}>
          {/* 첫 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <MailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="예약하신 전통 한복 체험 투어가 2024년 10월 15일에 예정되어 있습니다" secondary="1시간 전" />
          </ListItem>
          <Divider />

          {/* 두 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <MailIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="주문하신 전통 도자기 세트가 배송 준비 중입니다" secondary="1개월 전" />
          </ListItem>
          <Divider />

          {/* 세 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="구매하신 기념품에 대한 소중한 리뷰를 남겨주세요" secondary="1개월 전" />
          </ListItem>
          <Divider />

          {/* 네 번째 알림 */}
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="한정판 기념품 10% 할인 이벤트가 진행 중입니다" secondary="2개월 전" />
          </ListItem>
          <Divider />

          {/* Footer 부분 */}
          <MenuItem onClick={handleClose}>
            알림 지우기
          </MenuItem>
          <MenuItem onClick={handleClose}>
            더보기
          </MenuItem>
        </List>
      </Menu>
    </div >
  );
};

export default NotificationMenu;
