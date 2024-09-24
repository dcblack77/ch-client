import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import './index.css';
//import  App  from './App';
import { LoginFormComponent } from './Components/Forms/Login/LoginForm.component';

// Crea una instancia de QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginFormComponent />
    </QueryClientProvider>
  </React.StrictMode>,
);
