import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getAppointments } from '../services/appointmentService';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        const appointmentsWithIds = data.map(appointment => ({ ...appointment, id: appointment.appointmentId }));
        setAppointments(appointmentsWithIds);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const columns = [
    { field: 'appointmentId', headerName: 'Appointment ID', width: 130 },
    { field: 'appointmentDate', headerName: 'Date', width: 120 },
    { field: 'appointmentTime', headerName: 'Time', width: 120 },
    { field: 'customerName', headerName: 'Customer', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'serviceType', headerName: 'Service', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Paper sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <DataGrid
          rows={appointments}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          loading={loading}
        />
      </Paper>
    </Box>
  );
}

export default Appointments; 