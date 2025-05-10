import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { addPet, getPets, getGroupedBreeds } from '../services/petService';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState({
    open: false,
    pet: null,
  });
  const [newPet, setNewPet] = useState({
    customerName: '',
    species: '',
    breedName: '',
    petName: '',
    gender: '',
    birthday: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [breedsData, setBreedsData] = useState({});
  const [speciesOptions, setSpeciesOptions] = useState([]);

  const genderOptions = ['Male', 'Female'];

  const fetchBreedsData = async () => {
    try {
      const data = await getGroupedBreeds();
      // Transform the array of objects into an object with species as keys
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
      width: 130,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleViewDetails(params.row.id)}
        >
          View Details
        </Button>
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
    setNewPet({
      customerName: '',
      species: '',
      breedName: '',
      petName: '',
      gender: '',
      birthday: '',
      description: '',
    });
    setSelectedFile(null);
    setErrors({});
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newPet.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!newPet.customerName.trim()) newErrors.customerName = 'Owner name is required';
    if (!newPet.species) newErrors.species = 'Species is required';
    if (!newPet.breedName) newErrors.breedName = 'Breed is required';
    if (!newPet.gender) newErrors.gender = 'Gender is required';
    if (!newPet.birthday) newErrors.birthday = 'Birthday is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        await addPet(newPet, selectedFile);
        setSnackbar({
          open: true,
          message: 'Pet added successfully!',
          severity: 'success',
        });
        handleCloseDialog();
        fetchPets(); // Refresh the pets list
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to add pet: ' + error,
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet(prev => ({
      ...prev,
      [name]: value,
      // Reset breed when species changes
      ...(name === 'species' && { breedName: '' }),
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Pet</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="petName"
              label="Pet Name"
              value={newPet.petName}
              onChange={handleInputChange}
              error={!!errors.petName}
              helperText={errors.petName}
              fullWidth
            />
            <TextField
              name="customerName"
              label="Owner Name"
              value={newPet.customerName}
              onChange={handleInputChange}
              error={!!errors.customerName}
              helperText={errors.customerName}
              fullWidth
            />
            <FormControl fullWidth error={!!errors.species}>
              <InputLabel>Species</InputLabel>
              <Select
                name="species"
                value={newPet.species}
                onChange={handleInputChange}
                label="Species"
              >
                {speciesOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth error={!!errors.breedName}>
              <InputLabel>Breed</InputLabel>
              <Select
                name="breedName"
                value={newPet.breedName}
                onChange={handleInputChange}
                label="Breed"
                disabled={!newPet.species}
              >
                {newPet.species && breedsData[newPet.species]?.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    {breed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={newPet.gender}
                onChange={handleInputChange}
                label="Gender"
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="birthday"
              label="Birthday"
              type="date"
              value={newPet.birthday}
              onChange={handleInputChange}
              error={!!errors.birthday}
              helperText={errors.birthday}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="description"
              label="Description"
              value={newPet.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Pet Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loading}
          >
            Add Pet
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={detailsDialog.open} 
        onClose={handleCloseDetailsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Pet Details</DialogTitle>
        <DialogContent>
          {detailsDialog.pet && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Pet Name</Typography>
                <Typography variant="body1">{detailsDialog.pet.petName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Owner</Typography>
                <Typography variant="body1">{detailsDialog.pet.customerName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Species</Typography>
                <Typography variant="body1">{detailsDialog.pet.species}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Breed</Typography>
                <Typography variant="body1">{detailsDialog.pet.breedName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Gender</Typography>
                <Typography variant="body1">{detailsDialog.pet.gender}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Birthday</Typography>
                <Typography variant="body1">{detailsDialog.pet.birthday}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">Description</Typography>
                <Typography variant="body1">{detailsDialog.pet.description || 'No description provided'}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>

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