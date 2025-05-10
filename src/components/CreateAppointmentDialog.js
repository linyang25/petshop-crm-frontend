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

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
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
    appointmentType: '',
    date: '',
    time: '',
    notes: '',
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
        customerName: pet.customerName,
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Appointment Type"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              required
            >
              {appointmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading || !formData.appointmentType || !formData.date || !formData.time}
        >
          {loading ? 'Creating...' : 'Create Appointment'}
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CreateAppointmentDialog; 