import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { addPet } from '../services/petService';

const AddPetDialog = ({ open, onClose, onSuccess, breedsData, speciesOptions }) => {
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
  const [loading, setLoading] = useState(false);

  const genderOptions = ['Male', 'Female'];

  const handleCloseDialog = () => {
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
    onClose();
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
        onSuccess();
        handleCloseDialog();
      } catch (error) {
        // Handle error
        console.error('Failed to add pet:', error);
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
      ...(name === 'species' && { breedName: '' }),
    }));
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
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
  );
};

export default AddPetDialog; 