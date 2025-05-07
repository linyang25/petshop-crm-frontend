import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for initial development
  const mockPets = [
    { id: 1, name: 'Max', species: 'Dog', breed: 'Golden Retriever', age: 3, owner: 'John Doe' },
    { id: 2, name: 'Luna', species: 'Cat', breed: 'Siamese', age: 2, owner: 'Jane Smith' },
    { id: 3, name: 'Rocky', species: 'Dog', breed: 'German Shepherd', age: 4, owner: 'Mike Johnson' },
  ];

  useEffect(() => {
    // TODO: Replace with actual API call
    setPets(mockPets);
    setLoading(false);
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'species', headerName: 'Species', width: 130 },
    { field: 'breed', headerName: 'Breed', width: 180 },
    { field: 'age', headerName: 'Age', width: 90, type: 'number' },
    { field: 'owner', headerName: 'Owner', width: 180 },
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

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Pets Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => console.log('Add new pet')}
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
    </Box>
  );
};

export default Pets; 