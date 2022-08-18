import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ThemeProvider, useTheme } from '@mui/material';
const queryClient = new QueryClient();

function App() {
  const theme = useTheme();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
