// components/Toolbar.tsx

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Slide,
  useScrollTrigger,
  Switch,
  Drawer
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Contacts as ContactsIcon,
  Settings as SettingsIcon,
  AccountCircle,
  Menu as MenuIcon
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const drawerWidth = 240;

const Toolbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElUser(null);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          ml: `${open ? drawerWidth : 0}px`,
          transition: 'width 0.3s, margin-left 0.3s',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <MuiToolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenu}>
            <ContactsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleSettings}>
            <SettingsIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="account"
            onClick={handleUserMenu}
          >
            <Avatar alt="User" src="" />
          </IconButton>
        </MuiToolbar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Contact 1</MenuItem>
          <MenuItem onClick={handleClose}>Contact 2</MenuItem>
          <MenuItem onClick={handleClose}>Contact 3</MenuItem>
        </Menu>
        <Menu
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleClose}
        >
          <MenuItem component={Link} href="/user/create">Create</MenuItem>
          <MenuItem component={Link} href="/user/edit">Edit</MenuItem>
          <MenuItem component={Link} href="/user/list">List</MenuItem>
          <MenuItem component={Link} href="/user/account">Account</MenuItem>
        </Menu>
        <Drawer
          anchor="right"
          open={settingsOpen}
          onClose={toggleSettings}
        >
          <Box sx={{ width: 250, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Dark Mode</Typography>
              <Switch />
            </Box>
          </Box>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Toolbar;
