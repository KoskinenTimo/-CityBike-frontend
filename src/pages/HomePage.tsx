import { Button } from '@mui/material';
import React from 'react';
import { MUIAppBar } from '../components/MUIAppBar';

const HomePage = () => {
  return (
    <div>
      <MUIAppBar>
        <Button
          onClick={() => {}}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Home
        </Button>
      </MUIAppBar>
    </div>
  )
}

export default HomePage;