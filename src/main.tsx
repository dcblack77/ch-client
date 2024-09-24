import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Ahora utilizamos App, que contiene la lógica de enrutamiento y React Query

// Montamos la aplicación en el root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
