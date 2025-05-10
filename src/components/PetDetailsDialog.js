import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

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

const PetDetailsDialog = ({ open, onClose, pet }) => {
  if (!pet) return null;

  return (
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
  );
};

export default PetDetailsDialog; 