import { Typography, Box } from '@mui/material';

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography variant="h2" fontWeight="bold" sx={{ m: '0 0 5px 0' }}>
        {title}
      </Typography>
      <Typography variant="h5" color="green">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default DashboardHeader;
