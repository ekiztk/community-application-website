import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { mainLogo, profileImage } from '../../assets/img';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from 'store';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ChevronLeft } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const isMobile = useMediaQuery('(max-width:768px)');

  const authContent = () => {
    if (user && isAuth) {
      return !isMobile ? (
        <>
          <Button color="inherit">
            <Link
              to="/profile"
              className="flex flex-row justify-center items-center cursor-pointer whitespace-nowrap"
            >
              <Avatar alt="profile photo" src={profileImage} />
              {user?.name}
            </Link>
          </Button>

          <Button
            className="px-2"
            startIcon={<LogoutIcon />}
            variant="outlined"
            color="error"
          >
            <Link to="/" onClick={() => dispatch(setLogout())}>
              Log Out
            </Link>
          </Button>
        </>
      ) : (
        <>
          <ListItem key="Profile" disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon>
                <Avatar alt="profile photo" src={profileImage} />
              </ListItemIcon>
              <ListItemText primary={user?.name} />
            </ListItemButton>
          </ListItem>
          <ListItem key="logout" disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              onClick={() => dispatch(setLogout())}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </>
      );
    }

    return !isMobile ? (
      <>
        <Button variant="contained">
          <Link to="/auth/login">Log In</Link>
        </Button>

        <Button variant="contained">
          <Link to="/auth/signup">Sign Up</Link>
        </Button>
      </>
    ) : (
      <>
        <ListItem key="login" disablePadding>
          <ListItemButton component={Link} to="/auth/login">
            <ListItemText primary="Log In" />
          </ListItemButton>
        </ListItem>
        <ListItem key="signup" disablePadding>
          <ListItemButton color="success" component={Link} to="/auth/signup">
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </ListItem>
      </>
    );
  };

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        color="default"
        className="px-2 max-h-16"
      >
        <Toolbar className="gap-2">
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link
            className={`${isMobile && 'flex justify-end items-end'} flex-grow`}
            to="/"
          >
            <img
              className="object-contain max-h-16"
              src={mainLogo}
              alt="logo"
            />
          </Link>
          {!isMobile && (
            <>
              <Button color="inherit">
                <Link to="/">Home</Link>
              </Button>
              <Button color="inherit">
                <Link to="/applications">Applications</Link>
              </Button>
              <Divider orientation="vertical" variant="middle" flexItem />
              {authContent()}
            </>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpen(!open)}>
              <ChevronLeft />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem key="Home" disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Applications" disablePadding>
              <ListItemButton component={Link} to="/applications">
                <ListItemText primary="Applications" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>{authContent()}</List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
