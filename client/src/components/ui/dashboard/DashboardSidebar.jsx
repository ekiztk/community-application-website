import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Paper elevation={3}>
      <Sidebar
        className="min-h-screen"
        backgroundColor="transparent"
        collapsed={isCollapsed}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            button: {
              '&:hover': {
                backgroundColor: 'green',
                color: 'white',
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
                ml="15px"
              >
                <Typography variant="h5">
                  {import.meta.env.VITE_WEB_NAME}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
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
                  src={profileImage}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  Deneme
                </Typography>
                <Typography variant="h6">Deneme</Typography>
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
              to="/dashboard/logs/user"
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
              title="Applications"
              to="/applications"
              icon={<AppsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="body1"
              fontWeight={'bold'}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Stats
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
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
