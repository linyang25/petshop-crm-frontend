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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPet, setNewPet] = useState({
    customerName: '',
    species: '',
    breedName: '',
    petName: '',
    gender: '',
    birthday: '',
    profilePhoto: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  // Mock data for initial development
  const mockPets = [
    {
      id: 1,
      customerName: 'John Doe',
      species: 'Dog',
      breedName: 'Golden Retriever',
      petName: 'Max',
      gender: 'Male',
      birthday: '2020-05-15',
      profilePhoto: '',
      description: 'Friendly and playful dog',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      species: 'Cat',
      breedName: 'Siamese',
      petName: 'Luna',
      gender: 'Female',
      birthday: '2021-03-20',
      profilePhoto: '',
      description: 'Calm and affectionate cat',
    },
  ];

  const speciesOptions = ['Dog', 'Cat', 'Bird', 'Fish', 'Other'];
  const breedOptions = {
    Dog: ['Golden Retriever', 'German Shepherd', 'Labrador', 'Bulldog', 'Other'],
    Cat: ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Other'],
    Bird: ['Parrot', 'Canary', 'Cockatiel', 'Other'],
    Fish: ['Goldfish', 'Betta', 'Guppy', 'Other'],
    Other: ['Other'],
  };
  const genderOptions = ['Male', 'Female'];

  useEffect(() => {
    // TODO: Replace with actual API call
    setPets(mockPets);
    setLoading(false);
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
    // TODO: Implement view details functionality
    console.log('View details for pet:', id);
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
      profilePhoto: '',
      description: '',
    });
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

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Replace with actual API call
      const newPetWithId = {
        ...newPet,
        id: pets.length + 1,
      };
      setPets([...pets, newPetWithId]);
      handleCloseDialog();
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
          checkboxSelection
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
                {newPet.species && breedOptions[newPet.species].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
              name="profilePhoto"
              label="Profile Photo URL"
              value={newPet.profilePhoto}
              onChange={handleInputChange}
              fullWidth
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Pet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pets; 