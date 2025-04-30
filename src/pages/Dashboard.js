import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 140,
    }}
  >
    <Box
      sx={{
        backgroundColor: `${color}.light`,
        borderRadius: '50%',
        p: 2,
        mb: 2,
      }}
    >
      <Icon sx={{ color: `${color}.main`, fontSize: 40 }} />
    </Box>
    <Typography variant="h4" component="div">
      {value}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Pets"
            value="42"
            icon={PetsIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Clients"
            value="28"
            icon={PeopleIcon}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Appointments"
            value="5"
            icon={CalendarMonthIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Medical Records"
            value="156"
            icon={LocalHospitalIcon}
            color="info"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 