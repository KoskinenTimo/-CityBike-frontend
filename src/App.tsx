import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
const queryClient = new QueryClient();

function App() {


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
            <HomePage />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
