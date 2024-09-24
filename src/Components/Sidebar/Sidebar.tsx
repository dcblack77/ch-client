// src/Components/Sidebar/Sidebar.tsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {FaHome, FaUser, FaBars} from 'react-icons/fa'


export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { name: 'Inicio', icon: <FaHome />, path: '/dashboard/home' },
    { name: 'Usuarios', icon: <FaUser />, path: '/dashboard/users' },
    // Agrega más ítems según tus rutas
  ];

  return (
    <div
      className={` bg-gradient-to-r from-indigo-600 to-blue-500 text-white h-screen p-4 pt-8 ${
        isExpanded ? 'w-64' : 'w-20'
      } transition-all duration-300 relative`}
    >
      {/* Botón para expandir/colapsar */}
      <div
        className="absolute top-4 -right-3 w-7 h-7 bg-white border border-indigo-700 rounded-full flex items-center justify-center cursor-pointer"
        onClick={toggleSidebar}
      >
        <FaBars className="text-indigo-700" />
      </div>

      {/* Logo o título del Sidebar */}
      <div className="flex items-center gap-4 px-2">
        <FaHome size={28} />
        {isExpanded && <h1 className="text-2xl font-bold">Mi App</h1>}
      </div>

      {/* Menú de navegación */}
      <ul className="mt-10">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-6">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-2 py-2 rounded-md ${
                  isActive ? 'bg-indigo-500' : 'hover:bg-indigo-600'
                }`
              }
            >
              {item.icon}
              {isExpanded && <span>{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

