import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  DialogContentText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteAppointment } from '../services/appointmentService';
import EditAppointmentDialog from './EditAppointmentDialog';

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

const InfoValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1.1rem',
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

const AppointmentDetailsDialog = ({ open, onClose, appointment, onDelete }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (!appointment) return null;

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await deleteAppointment(appointment.id);
      setDeleteConfirmOpen(false);
      onDelete?.();
      onClose();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <StyledDialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>Appointment Details</StyledDialogTitle>
        <StyledDialogContent>
          <Grid container direction="column">
            <Row item>
              <InfoLabel variant="subtitle1">Appointment ID</InfoLabel>
              <InfoValue variant="body1">{appointment.appointmentId}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Date</InfoLabel>
              <InfoValue variant="body1">{appointment.appointmentDate}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Time</InfoLabel>
              <InfoValue variant="body1">{appointment.appointmentTime}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Customer</InfoLabel>
              <InfoValue variant="body1">{appointment.customerName}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Phone</InfoLabel>
              <InfoValue variant="body1">{appointment.phone}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Service</InfoLabel>
              <InfoValue variant="body1">{appointment.serviceType}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Status</InfoLabel>
              <InfoValue variant="body1">{appointment.status}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Notes</InfoLabel>
              <InfoValue variant="body1">{appointment.notes || 'No notes provided'}</InfoValue>
            </Row>
          </Grid>
        </StyledDialogContent>
        <StyledDialogActions>
          <Button 
            onClick={handleEditClick}
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              mr: 'auto'
            }}
          >
            Edit
          </Button>
          {appointment.status !== 'Canceled' && (
            <Button 
              onClick={handleDeleteClick}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
              }}
            >
              Cancel Appointment
            </Button>
          )}
          <Button 
            onClick={onClose}
            variant="contained"
            color="primary"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Close
          </Button>
        </StyledDialogActions>
      </StyledDialog>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            No, Keep It
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? 'Cancelling...' : 'Yes, Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <EditAppointmentDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        appointment={appointment}
        onSuccess={() => {
          handleCloseEditDialog();
          onDelete?.(); // Refresh the appointment list
        }}
        onDetailsClose={onClose}
      />
    </>
  );
};

export default AppointmentDetailsDialog; 