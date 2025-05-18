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
import { getPetStats, getAppointmentStats } from '../services/dashboardService';

const speciesData = [
  { name: 'Dog', value: 60 },
  { name: 'Cat', value: 40 },
];
const COLORS = ['#20cfcf', '#7c6ee6'];

const breedData = [
  { name: 'Labrador', value: 30 },
  { name: 'Beagle', value: 30 },
];

const weeklyTrend = [
  { day: 'Mon', value: 1 },
  { day: 'Tue', value: 2 },
  { day: 'Wed', value: 3 },
  { day: 'Thu', value: 4 },
  { day: 'Fri', value: 6 },
  { day: 'Sun', value: 4 },
];

const popularServices = [
  { name: 'Grooming', value: 100 },
  { name: 'Check-up', value: 60 },
  { name: 'Vaccination', value: 40 },
  { name: 'Surgery', value: 20 },
];

const appointments = [
  { time: '09:00 AM', customer: 'Lin Yang', pet: 'Budy', petType: 'dog', service: 'Grooming', status: 'Scheduled', reminder: true },
  { time: '10:30 AM', customer: 'Pet3_Ower', pet: 'Pet 3', petType: 'dog', service: 'Vaccination', status: 'Scheduled', reminder: false },
  { time: '02:00 PM', customer: 'Lin Yang', pet: 'Coco', petType: 'cat', service: 'Check-up', status: 'Cancelled', reminder: true },
  { time: '04:00 PM', customer: 'Lin Yang', pet: 'Budy', petType: 'dog', service: 'Grooming', status: 'Scheduled', reminder: true },
];

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={4}>Dashboard</Typography>
      {/* Summary Cards Row */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 100 }}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>128</Typography>
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
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>56</Typography>
              <Typography color="textSecondary">Total Customers</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', height: 100 }}>
            <Box sx={{ bgcolor: '#7c6ee6', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 3 }}>
              <CalendarMonthIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>7</Typography>
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
              <Typography variant="h2" fontWeight={700} fontSize={'2rem'}>2</Typography>
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
                <Pie data={speciesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label={{ fontSize: 22, fontWeight: 700 }}>
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box display="flex" justifyContent="center" gap={4} mt={2}>
              <Box display="flex" alignItems="center"><Box width={18} height={18} bgcolor="#20cfcf" borderRadius="50%" mr={1} /> <Typography fontSize={20}>Dog</Typography></Box>
              <Box display="flex" alignItems="center"><Box width={18} height={18} bgcolor="#7c6ee6" borderRadius="50%" mr={1} /> <Typography fontSize={20}>Cat</Typography></Box>
            </Box>
          </Paper>
        </Grid>
        {/* Second column: Breed Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, height: 452 }}>
            <Typography align="center" fontWeight={700} fontSize={20}>Breed Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={breedData}>
                <XAxis dataKey="name" fontSize={18} />
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
                <LineChart data={weeklyTrend}>
                  <XAxis dataKey="day" fontSize={18} />
                  <YAxis allowDecimals={false} fontSize={18} />
                  <Line type="monotone" dataKey="value" stroke="#20cfcf" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
            <Paper sx={{ p: 4, height: 200, flex: '0 0 auto' }}>
              <Typography fontWeight={700} fontSize={20}>Popular Services</Typography>
              {popularServices.map((service, idx) => (
                <Box key={service.name} display="flex" alignItems="center" mt={2} marginTop={0}>
                  <Typography width={120} fontSize={20}>{service.name}</Typography>
                  <Box flex={1}>
                    <Box height={14} bgcolor="#e0e0e0" borderRadius={7}>
                      <Box height={14} width={`${service.value}%`} bgcolor="#1976d2" borderRadius={7} />
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
                  {appointments.map((appt, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.customer}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: appt.petType === 'dog' ? '#20cfcf' : '#7c6ee6' }}>
                            <PetsIcon fontSize="small" />
                          </Avatar>
                          {appt.pet}
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
                        {appt.reminder ? (
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