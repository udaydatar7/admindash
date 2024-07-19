import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Login from "./login/login";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Slide,
  Switch,
  Drawer,
  useScrollTrigger,
  ThemeProvider,
  createTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import Sidenav from './components/sidenav';
import Link from 'next/link';

const drawerWidth = 240;

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

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const isLoginPage = router.pathname === '/login';
  if (isLoginPage){
    return (
      <Login/>
    )
  }
else{
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {isMounted && isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <Box sx={{ display: 'flex' }}>
          <HideOnScroll>
            <AppBar
              position="fixed"
              sx={{
                width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                ml: open ? `${drawerWidth}px` : 0,
                transition: 'width 0.3s, margin-left 0.3s',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <MuiToolbar>
                <IconButton
                  edge="start"
                  aria-label="menu"
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2, color: 'grey.800', ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>

                <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit" sx={{ color: 'grey.800' }}>
                    <Badge badgeContent={4} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit" onClick={handleMenu} sx={{ color: 'grey.800' }}>
                    <ContactsIcon />
                  </IconButton>
                  <IconButton color="inherit" onClick={toggleSettings} sx={{ color: 'grey.800' }}>
                    <SettingsIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account"
                    onClick={handleUserMenu}
                    sx={{ color: 'grey.800' }}
                  >
                    <Avatar alt="User" src="" />
                  </IconButton>
                </Box>
              </MuiToolbar>
            </AppBar>
          </HideOnScroll>
          <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
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
                <Switch checked={darkMode} onChange={handleThemeChange} />
              </Box>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              transition: 'margin-left 0.3s',
              marginLeft: 0,
              mt: 8,
            }}
          >
            <Component {...pageProps} />
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
}
