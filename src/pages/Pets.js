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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import { getPets, getGroupedBreeds, deletePet } from '../services/petService';
import AddPetDialog from '../components/AddPetDialog';
import PetDetailsDialog from '../components/PetDetailsDialog';
import CreateAppointmentDialog from '../components/CreateAppointmentDialog';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState({
    open: false,
    pet: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [breedsData, setBreedsData] = useState({});
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [appointmentDialog, setAppointmentDialog] = useState({
    open: false,
    pet: null,
  });

  const fetchBreedsData = async () => {
    try {
      const data = await getGroupedBreeds();
      const transformedData = data.reduce((acc, item) => {
        acc[item.species] = item.breeds;
        return acc;
      }, {});
      setBreedsData(transformedData);
      setSpeciesOptions(Object.keys(transformedData));
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to fetch breeds data: ' + error,
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    fetchBreedsData();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getPets();
      const petsWithIds = data.map(pet => ({ ...pet, id: pet.petId }));
      setPets(petsWithIds);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to fetch pets: ' + error,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const columns = [
    { field: 'petName', headerName: 'Pet Name', width: 130 },
    { field: 'customerName', headerName: 'Owner', width: 150 },
    { field: 'species', headerName: 'Species', width: 100 },
    { field: 'breedName', headerName: 'Breed', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'birthday', headerName: 'Birthday', width: 120 },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      renderCell: (params) => (
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleViewDetails(params.row.id)}
          >
            View Details
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<EventIcon />}
            onClick={() => handleCreateAppointment(params.row)}
          >
            Appointment
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeletePet(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleViewDetails = (id) => {
    const pet = pets.find(p => p.id === id);
    if (pet) {
      setDetailsDialog({
        open: true,
        pet,
      });
    }
  };

  const handleCloseDetailsDialog = () => {
    setDetailsDialog({
      open: false,
      pet: null,
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleDeletePet = async (id) => {
    try {
      await deletePet(id);
      setSnackbar({
        open: true,
        message: 'Pet deleted successfully',
        severity: 'success',
      });
      fetchPets();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete pet: ' + error,
        severity: 'error',
      });
    }
  };

  const handleCreateAppointment = (pet) => {
    setAppointmentDialog({
      open: true,
      pet,
    });
  };

  const handleCloseAppointmentDialog = () => {
    setAppointmentDialog({
      open: false,
      pet: null,
    });
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Pets Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add Pet
        </Button>
      </Box>
      <Paper sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <DataGrid
          rows={pets}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          loading={loading}
        />
      </Paper>

      <AddPetDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSuccess={fetchPets}
        breedsData={breedsData}
        speciesOptions={speciesOptions}
      />

      <PetDetailsDialog
        open={detailsDialog.open}
        onClose={handleCloseDetailsDialog}
        pet={detailsDialog.pet}
        onDelete={fetchPets}
      />

      <CreateAppointmentDialog
        open={appointmentDialog.open}
        onClose={handleCloseAppointmentDialog}
        pet={appointmentDialog.pet}
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: 'Appointment created successfully',
            severity: 'success',
          });
        }}
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
};

export default Pets; 