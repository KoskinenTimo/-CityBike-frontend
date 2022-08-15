import React from 'react';
import { Button } from '@mui/material';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppBarButton = ({ children, ...other }: any) => (
  <Button
    sx={{ my: 2, color: 'white', display: 'block' }}
    {...other}
    className="app-bar-button"
  >
    {children}
  </Button>
);