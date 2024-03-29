import { useState } from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { profileImage } from 'assets/img';
import AppsIcon from '@mui/icons-material/Apps';
import DvrIcon from '@mui/icons-material/Dvr';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography variant="body2">{title}</Typography>
    </MenuItem>
  );
};

const DashboardSidebar = () => {
  const user = useSelector((state) => state.auth.user);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Paper elevation={3}>
      <Sidebar
        className="min-h-screen !border-none"
        backgroundColor="transparent"
        collapsed={isCollapsed}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            button: {
              '&:hover': {
                backgroundColor: 'transparent',
                border: '1px solid green',
              },
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
                <Typography variant="h6">
                  {import.meta.env.VITE_WEB_NAME}
                </Typography>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="16px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="64px"
                  height="64px"
                  src={
                    user?.photo
                      ? `${
                          import.meta.env.VITE_BASE_API_URL
                        }/assets/img/users/${user?.photo}`
                      : profileImage
                  }
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user?.name}
                </Typography>
                <Typography variant="h7">{user?.role?.label}</Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="body1"
              fontWeight={'bold'}
              sx={{ m: '15px 0 5px 20px' }}
            >
              User
            </Typography>
            <Item
              title="Manage Users"
              to="/dashboard/userList"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User Logs"
              to="/workingInProgress"
              icon={<DvrIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="body1"
              fontWeight={'bold'}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Pages
            </Typography>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Applications"
              to="/applications"
              icon={<AppsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Paper>
  );
};

export default DashboardSidebar;
