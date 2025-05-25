import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Container,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getDashboardData } from '../services/dashboardService';

const COLORS = ['#20cfcf', '#7c6ee6'];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalPets: 0,
    totalCustomers: 0,
    appointmentsToday: 0,
    cancelledToday: 0,
    speciesDistribution: [],
    breedDistribution: [],
    popularServices: [],
    weeklyAppointmentTrend: [],
    todayAppointments: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={4}>Dashboard</Typography>
      {/* Summary Cards Row */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 100 }}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>{dashboardData.totalPets}</Typography>
              <Typography color="textSecondary">Total Pets</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 100 }}>
            <Box sx={{ bgcolor: '#20cfcf', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 3 }}>
              <PeopleIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>{dashboardData.newPetsToday}</Typography>
              <Typography color="textSecondary">New Pets Today</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 100 }}>
            <Box sx={{ bgcolor: '#7c6ee6', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 3 }}>
              <CalendarMonthIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>{dashboardData.appointmentsToday}</Typography>
              <Typography color="textSecondary">Appointments Today</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 100 }}>
            <Box sx={{ bgcolor: '#f44336', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 3 }}>
              <CancelIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>{dashboardData.cancelledToday}</Typography>
              <Typography color="textSecondary">Cancelled Today</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Main Dashboard Content */}
      <Grid container spacing={4} minHeight="50vh">
        {/* First column: Species Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, height: 452, width: '300px' }}>
            <Typography align="center" fontWeight={700} fontSize={20}>Species Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={dashboardData.speciesDistribution} 
                  dataKey="value" 
                  nameKey="label" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={120} 
                  label={({ label, percent }) => `${label} ${(percent).toFixed(0)}%`}
                >
                  {dashboardData.speciesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box display="flex" justifyContent="center" gap={4} mt={2}>
              {dashboardData.speciesDistribution.map((species, index) => (
                <Box key={species.label} display="flex" alignItems="center">
                  <Box width={18} height={18} bgcolor={COLORS[index % COLORS.length]} borderRadius="50%" mr={1} />
                  <Typography fontSize={20}>{species.label}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        {/* Second column: Breed Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, height: 452, width: 360 }}>
            <Typography align="center" fontWeight={700} fontSize={20}>Breed Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.breedDistribution}>
                <XAxis dataKey="label" fontSize={18} />
                <YAxis allowDecimals={false} fontSize={18} />
                <Bar dataKey="value" fill="#7c6ee6" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Third column: Weekly Appointment Trend and Popular Services stacked vertically */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={4} height="100%">
            <Paper sx={{ p: 4, height: 220, flex: '0 0 auto' }}>
              <Typography align="center" fontWeight={700} fontSize={20}>Weekly Appointment Trend</Typography>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={dashboardData.weeklyAppointmentTrend}>
                  <XAxis dataKey="day" fontSize={18} />
                  <YAxis allowDecimals={false} fontSize={18} />
                  <Line type="monotone" dataKey="count" stroke="#20cfcf" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
            <Paper sx={{ p: 4, height: 200, flex: '0 0 auto' }}>
              <Typography fontWeight={700} fontSize={20}>Popular Services</Typography>
              {dashboardData.popularServices.map((service) => (
                <Box key={service.label} display="flex" alignItems="center" mt={2} marginTop={0}>
                  <Typography width={120} fontSize={20}>{service.label}</Typography>
                  <Box flex={1}>
                    <Box height={14} bgcolor="#e0e0e0" borderRadius={7}>
                      <Box height={14} width={`${service.percent}%`} bgcolor="#1976d2" borderRadius={7} />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        </Grid>

        {/* Today's Appointments */}
        <Grid item xs={12} md={12} width={'1050px'}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight={700} fontSize={20}>Today's Appointments</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Pet</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Reminder Sent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.todayAppointments.map((appt, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.customerName}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: '#20cfcf' }}>
                            <PetsIcon fontSize="small" />
                          </Avatar>
                          {appt.petName}
                        </Box>
                      </TableCell>
                      <TableCell>{appt.service}</TableCell>
                      <TableCell>
                        {appt.status === 'Scheduled' ? (
                          <Typography color="primary">Scheduled</Typography>
                        ) : (
                          <Typography color="error">Cancelled</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {appt.reminderSent ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelOutlinedIcon color="disabled" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 