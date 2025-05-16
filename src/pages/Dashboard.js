import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Container, Tabs, Tab } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPetStats, getAppointmentStats } from '../services/dashboardService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 140,
      minWidth: 220,
      mb: 2,
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

const ChartCard = ({ title, children }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      height: '100%',
      minHeight: 400,
      minWidth: 320,
      mb: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {children}
  </Paper>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointmentStats, setAppointmentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [petStats, apptStats] = await Promise.all([
          getPetStats(),
          getAppointmentStats()
        ]);
        setStats(petStats);
        setAppointmentStats(apptStats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading dashboard: {error}</Typography>
      </Box>
    );
  }

  const speciesData = Object.entries(stats.speciesDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const breedData = Object.entries(stats.breedDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const timeSlotData = Object.entries(appointmentStats.timeSlotDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const topServicesData = appointmentStats.topServices.map(service => ({
    name: service.serviceType,
    value: service.count,
  }));

  const renderPetStats = () => (
    <Box>
      <Grid container spacing={4} sx={{ mb: 4, flexWrap: 'wrap' }}>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="Total Pets"
            value={stats.totalPets}
            icon={PetsIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="Today's New Pets"
            value={stats.todayNewPets}
            icon={PetsIcon}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="This Week's New Pets"
            value={stats.weekNewPets}
            icon={PetsIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="This Month's New Pets"
            value={stats.monthNewPets}
            icon={PetsIcon}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ flexWrap: 'wrap' }}>
        <Grid item xs={12} md={6} minWidth={350}>
          <ChartCard title="Species Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6} minWidth={350}>
          <ChartCard title="Breed Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={breedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 3, minWidth: 250 }}>
            <Typography variant="h6" gutterBottom>
              Average Pet Age
            </Typography>
            <Typography variant="h4">
              {Math.round(stats.averageAgeDays / 365 * 10) / 10} years
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({stats.averageAgeDays} days)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderAppointmentStats = () => (
    <Box>
      <Grid container spacing={4} sx={{ mb: 4, flexWrap: 'wrap' }}>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="Total Appointments"
            value={appointmentStats.totalAppointments}
            icon={CalendarMonthIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="Today's Appointments"
            value={appointmentStats.todayNewAppointments}
            icon={CalendarMonthIcon}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="Cancellation Rate"
            value={`${appointmentStats.cancellationRate}%`}
            icon={CalendarMonthIcon}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} minWidth={250}>
          <StatCard
            title="No-Show Rate"
            value={`${appointmentStats.noShowRate}%`}
            icon={CalendarMonthIcon}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ flexWrap: 'wrap' }}>
        <Grid item xs={12} md={6} minWidth={350}>
          <ChartCard title="Time Slot Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSlotData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6} minWidth={350}>
          <ChartCard title="Top Services">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topServicesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 3, minWidth: 250 }}>
            <Typography variant="h6" gutterBottom>
              Average Lead Time
            </Typography>
            <Typography variant="h4">
              {Math.round(appointmentStats.avgLeadTimeDays * 10) / 10} days
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time between booking and appointment
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ flexGrow: 1, p: 0 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="dashboard tabs">
            <Tab 
              icon={<PetsIcon />} 
              label="Pet Statistics" 
              iconPosition="start"
            />
            <Tab 
              icon={<CalendarMonthIcon />} 
              label="Appointment Statistics" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {activeTab === 0 && renderPetStats()}
        {activeTab === 1 && renderAppointmentStats()}
      </Box>
    </Container>
  );
};

export default Dashboard; 