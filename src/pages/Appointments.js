import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAppointments } from '../services/appointmentService';
import AppointmentDetailsDialog from '../components/AppointmentDetailsDialog';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState({
    open: false,
    appointment: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      const appointmentsWithIds = data.map(appointment => ({ ...appointment, id: appointment.appointmentId }));
      setAppointments(appointmentsWithIds);
    } catch (err) {
      setError('Failed to fetch appointments');
      setSnackbar({
        open: true,
        message: 'Failed to fetch appointments: ' + err,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleViewDetails = (appointment) => {
    setDetailsDialog({
      open: true,
      appointment,
    });
  };

  const handleCloseDetailsDialog = () => {
    setDetailsDialog({
      open: false,
      appointment: null,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const columns = [
    { field: 'appointmentId', headerName: 'Appointment ID', width: 130 },
    { field: 'appointmentDate', headerName: 'Date', width: 120 },
    { field: 'appointmentTime', headerName: 'Time', width: 120 },
    { field: 'customerName', headerName: 'Customer', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'serviceType', headerName: 'Service', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => handleViewDetails(params.row)}
          >
            View Details
          </Button>
        </Box>
      ),
    },
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

      <AppointmentDetailsDialog
        open={detailsDialog.open}
        onClose={handleCloseDetailsDialog}
        appointment={detailsDialog.appointment}
        onDelete={fetchAppointments}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Appointments; 