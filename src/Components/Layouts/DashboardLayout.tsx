// src/Layouts/DashboardLayout.tsx

import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import {Header} from '../Header/Header';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


