import React from 'react';
import { AppBar, Box } from '@mui/material';
import { ToolbarWrapper } from './MUIAppBar.styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MUIAppBar = ({ children }: any) => {
  return (
    <Box>
      <AppBar
        position="static"
        color='transparent'
      >

        <ToolbarWrapper>
          {children}
        </ToolbarWrapper>
            
      </AppBar>
    </Box>
  );
};