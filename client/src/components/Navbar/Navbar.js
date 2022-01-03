import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
import NotesSideBar from "../NotesSideBar/NotesSideBar";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authSlice from "../../store/slices/auth";
import hobbySlice from "../../store/slices/hobby";
import groupSlice from "../../store/slices/group";
import noteSlice from "../../store/slices/notes";

// Material UI Icons
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Settings from "@mui/icons-material/SettingsOutlined";
import Logout from "@mui/icons-material/Logout";
import Icon from "@mui/material/Icon";
import EditIcon from '@mui/icons-material/Edit';


const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    dispatch(hobbySlice.actions.clearHobby())
    dispatch(groupSlice.actions.clearGroup())
    dispatch(noteSlice.actions.clearNotes())
    history.push("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotes = () => {
    setNotes(!notes);
    console.log("Notes have changed")
  }

  const menuId = "menu-appbar";
  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Icon baseClassName="far" className="fa-user" fontSize="small" />
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Settings fontSize="small" />
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <Logout fontSize="small" />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge >
            <EditIcon />
          </Badge>
        </IconButton>
        <p>Notes</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { md: "none", lg: "block" } }}>
        <Sidebar open={open} handleClose={handleDrawerClose} />
      </Box>
      <Box>
        <AppBar
          headerPosition
          position="relative"
          color="inherit"
          elevation={0}
        >
          <Toolbar sx={{ justifyContent: "space-between" }} variant="dense">
            <Box sx={{ display: { md: "inline-flex", lg: "none" } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  paddingTop: "5%",
                }}
              >
                Hobbeetat
              </Typography>
            </Box>
            <Box
              sx={{ display: { sm: "block", md: "none", lg: "inline-flex" } }}
            />
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                paddingLeft: "4%",
              }}
            >
           
            </Box>

            <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                paddingRight: "4%",
                paddingTop: "5%"
              }}
            >
             <Search/> 
            </Box>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="primary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotes}
              >
                <Badge color="primary">
                  <EditIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt="user profile"
                  src="https://www.fillmurray.com/500/900"
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        
      </Box>
      <Box>{notes ? <NotesSideBar open={notes} close={handleNotes}/>:null}</Box>
    </>
  );
};

export default Navbar;
