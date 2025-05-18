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
      <Typography variant="h4" fontWeight={700} mb={2}>Pet Shop CRM</Typography>
      {/* Summary Cards Row */}
      <Grid container spacing={4} mb={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4">128</Typography>
            <Typography color="textSecondary">Total Pets</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PeopleIcon sx={{ color: '#20cfcf', fontSize: 32 }} />
            <Typography variant="h4">56</Typography>
            <Typography color="textSecondary">Total Customers</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CalendarMonthIcon sx={{ color: '#7c6ee6', fontSize: 32 }} />
            <Typography variant="h4">7</Typography>
            <Typography color="textSecondary">Appointments Today</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CancelIcon sx={{ color: '#f44336', fontSize: 32 }} />
            <Typography variant="h4">2</Typography>
            <Typography color="textSecondary">Cancelled Today</Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* Main Dashboard Content */}
      <Grid container spacing={4}>
        {/* First column: Species Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 320 }}>
            <Typography align="center" fontWeight={600}>Species Distribution</Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={speciesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box display="flex" justifyContent="center" gap={2} mt={1}>
              <Box display="flex" alignItems="center"><Box width={12} height={12} bgcolor="#20cfcf" borderRadius="50%" mr={1} />Dog</Box>
              <Box display="flex" alignItems="center"><Box width={12} height={12} bgcolor="#7c6ee6" borderRadius="50%" mr={1} />Cat</Box>
            </Box>
          </Paper>
        </Grid>
        {/* Second column: Breed Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 320 }}>
            <Typography align="center" fontWeight={600}>Breed Distribution</Typography>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={breedData}>
                <XAxis dataKey="name" />
                <Bar dataKey="value" fill="#7c6ee6" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Third column: Weekly Appointment Trend and Popular Services stacked vertically */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={2} height="100%">
            <Paper sx={{ p: 2, height: 180, flex: '0 0 auto' }}>
              <Typography align="center" fontWeight={600}>Weekly Appointment Trend</Typography>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={weeklyTrend}>
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Line type="monotone" dataKey="value" stroke="#20cfcf" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
            <Paper sx={{ p: 2, height: 120, flex: '0 0 auto' }}>
              <Typography fontWeight={600}>Popular Services</Typography>
              {popularServices.map((service, idx) => (
                <Box key={service.name} display="flex" alignItems="center" mt={1}>
                  <Typography width={100}>{service.name}</Typography>
                  <Box flex={1}>
                    <Box height={8} bgcolor="#e0e0e0" borderRadius={4}>
                      <Box height={8} width={`${service.value}%`} bgcolor="#1976d2" borderRadius={4} />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        </Grid>

        {/* Today's Appointments */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight={600} mb={1}>Today's Appointments</Typography>
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