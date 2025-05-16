import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { createAppointment } from '../services/petService';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  '& .MuiTypography-root': {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
  fontWeight: 500,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const Row = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

const appointmentTypes = [
  'Check-up',
  'Vaccination',
  'Grooming',
  'Surgery',
  'Dental',
  'Other'
];

const CreateAppointmentDialog = ({ open, onClose, pet, onSuccess }) => {
  const [formData, setFormData] = useState({
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
    customerName: '',
    customerEmail: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const appointmentData = {
        ...formData,
        petId: pet.id,
        petName: pet.petName,

      };
      await createAppointment(appointmentData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to create appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>Create Appointment</StyledDialogTitle>
      <StyledDialogContent>
        <Grid container direction="column">
          <Row item>
            <InfoLabel variant="subtitle1">Pet Name</InfoLabel>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{pet?.petName}</Typography>
          </Row>
          <Row item>
            <InfoLabel variant="subtitle1">Owner</InfoLabel>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{pet?.customerName}</Typography>
          </Row>
          <Row item>
            <InfoLabel variant="subtitle1" sx={{ mb: 2 }}>Custom Information</InfoLabel>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  name="customerName"
                  value={formData.customerName || ''}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Customer Email"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail || ''}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>
          </Row>
          <Row item>
            <InfoLabel variant="subtitle1">Appointment Type</InfoLabel>
            <TextField
              select
              fullWidth
              name="serviceType"
              value={formData.appointmentType}
              onChange={handleChange}
              required
              size="small"
            >
              {appointmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Row>
          <Row item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InfoLabel variant="subtitle1">Date</InfoLabel>
                <TextField
                  fullWidth
                  type="date"
                  name="appointmentDate"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel variant="subtitle1">Time</InfoLabel>
                <TextField
                  fullWidth
                  type="time"
                  name="appointmentTime"
                  value={formData.time}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  size="small"
                />
              </Grid>
            </Grid>
          </Row>
          <Row item>
            <InfoLabel variant="subtitle1">Notes</InfoLabel>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              size="small"
            />
          </Row>
        </Grid>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button 
          onClick={onClose} 
          disabled={loading}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading || !formData.serviceType || !formData.appointmentDate || !formData.appointmentTime}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
          }}
        >
          {loading ? 'Creating...' : 'Create Appointment'}
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CreateAppointmentDialog; 