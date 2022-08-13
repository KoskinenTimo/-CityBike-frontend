import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { ToolbarWrapper } from './MUIAppBar.styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MUIAppBar = ({ children }: any) => {
  return (
    <Box sx={{ flexGrow: 1, height: '5em' }}>
      <AppBar
        position="static"
        color='secondary'
        style={{ height: '60px' }}
      >

        <ToolbarWrapper>
          {children}
        </ToolbarWrapper>
            
      </AppBar>
    </Box>
  )
}