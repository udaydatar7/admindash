"use client";
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  People,
  Inventory,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

const drawerWidth = 240;

interface SidenavProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidenav: React.FC<SidenavProps> = ({ open, handleDrawerClose }) => {
  const [openUser, setOpenUser] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const handleClickUser = () => {
    setOpenUser(!openUser);
  };

  const handleClickProduct = () => {
    setOpenProduct(!openProduct);
  };

  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 0,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.3s',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <IconButton onClick={handleDrawerClose} sx={{ display: open ? 'block' : 'none' }}>
            <ChevronLeftIcon />
          </IconButton>
          <Image src="" alt="Logo" width={40} height={40} />
        </Box>
      </Toolbar>
      <Box
        sx={{
          backgroundColor: '#f4f5fa',
          height: '100vh',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ mt: 2, ml: 2, color: '#9e9e9e' }}>
          OVERVIEW
        </Typography>
        <List component="nav">
          <ListItem button component={Link} href="/dashboard">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={handleClickUser}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="User" />
            {openUser ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openUser} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} component={Link} href="/user/create">
                <ListItemText primary="Create" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} href="/user/edit">
                <ListItemText primary="Edit" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} href="/user/list">
                <ListItemText primary="List" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} href="/user/account">
                <ListItemText primary="Account" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleClickProduct}>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Product" />
            {openProduct ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} component={Link} href="/product/list">
                <ListItemText primary="List" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} href="/product/create">
                <ListItemText primary="Create" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} href="/product/edit">
                <ListItemText primary="Edit" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidenav;
