// src/Layouts/DashboardLayout.tsx

import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { RegisterDataForm } from '../Forms/RegisterData/RegisterDataForm';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-white">
          {/* Mostrar el formulario al cargar */}
          <h1 className="text-2xl font-bold mb-4">Registro de Horas</h1>
          <RegisterDataForm />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
