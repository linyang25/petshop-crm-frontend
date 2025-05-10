import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPetStats } from '../services/dashboardService';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPetStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Pets"
            value={stats.totalPets}
            icon={PetsIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's New Pets"
            value={stats.todayNewPets}
            icon={PetsIcon}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="This Week's New Pets"
            value={stats.weekNewPets}
            icon={PetsIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="This Month's New Pets"
            value={stats.monthNewPets}
            icon={PetsIcon}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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

      {/* Average Age */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
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
};

export default Dashboard; 