import React, { useState, useEffect } from 'react';
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
import { updatePet } from '../services/petService';

const EditPetDialog = ({ open, onClose, onSuccess, onDetailsClose, pet, breedsData, speciesOptions }) => {
  const [editedPet, setEditedPet] = useState({
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

  useEffect(() => {
    if (pet) {
      setEditedPet({
        customerName: pet.customerName || '',
        species: pet.species || '',
        breedName: pet.breedName || '',
        petName: pet.petName || '',
        gender: pet.gender || '',
        birthday: pet.birthday || '',
        description: pet.description || '',
      });
    }
  }, [pet]);

  const handleCloseDialog = () => {
    setEditedPet({
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
    if (!editedPet.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!editedPet.species) newErrors.species = 'Species is required';
    if (!editedPet.breedName) newErrors.breedName = 'Breed is required';
    if (!editedPet.gender) newErrors.gender = 'Gender is required';
    if (!editedPet.birthday) newErrors.birthday = 'Birthday is required';
    
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
        await updatePet(pet.pet_Id, editedPet, selectedFile);
        onSuccess();
        handleCloseDialog();
        onDetailsClose?.();
      } catch (error) {
        console.error('Failed to update pet:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPet(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'species' && { breedName: '' }),
    }));
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Pet</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            name="petName"
            label="Pet Name"
            value={editedPet.petName}
            onChange={handleInputChange}
            error={!!errors.petName}
            helperText={errors.petName}
            fullWidth
          />
          <TextField
            name="customerName"
            label="Owner Name"
            value={editedPet.customerName}
            disabled
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
              },
              '& .MuiInputLabel-root.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
            }}
            fullWidth
          />
          <FormControl fullWidth error={!!errors.species}>
            <InputLabel>Species</InputLabel>
            <Select
              name="species"
              value={editedPet.species}
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
              value={editedPet.breedName}
              onChange={handleInputChange}
              label="Breed"
              disabled={!editedPet.species}
            >
              {editedPet.species && breedsData[editedPet.species]?.map((breed) => (
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
              value={editedPet.gender}
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
            value={editedPet.birthday}
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
            value={editedPet.description}
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
            Update Pet Photo
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
          Update Pet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPetDialog; 