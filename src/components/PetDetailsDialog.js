import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  DialogContentText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePet } from '../services/petService';

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

const PetDetailsDialog = ({ open, onClose, pet, onDelete }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!pet) return null;

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await deletePet(pet.id);
      setDeleteConfirmOpen(false);
      onDelete?.();
      onClose();
    } catch (error) {
      console.error('Failed to delete pet:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  return (
    <>
      <StyledDialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>Pet Details</StyledDialogTitle>
        <StyledDialogContent>
          <Grid container direction="column">
            <Row item>
              <InfoLabel variant="subtitle1">Pet Name</InfoLabel>
              <InfoValue variant="body1">{pet.petName}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Owner</InfoLabel>
              <InfoValue variant="body1">{pet.customerName}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Species</InfoLabel>
              <InfoValue variant="body1">{pet.species}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Breed</InfoLabel>
              <InfoValue variant="body1">{pet.breedName}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Gender</InfoLabel>
              <InfoValue variant="body1">{pet.gender}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Birthday</InfoLabel>
              <InfoValue variant="body1">{pet.birthday}</InfoValue>
            </Row>
            <Row item>
              <InfoLabel variant="subtitle1">Description</InfoLabel>
              <InfoValue variant="body1">{pet.description || 'No description provided'}</InfoValue>
            </Row>
          </Grid>
        </StyledDialogContent>
        <StyledDialogActions>
          <Button 
            onClick={handleDeleteClick}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              mr: 'auto'
            }}
          >
            Delete Pet
          </Button>
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
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {pet.petName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PetDetailsDialog; 