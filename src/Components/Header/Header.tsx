import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo o Título */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>

          {/* Enlaces de navegación */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/login" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              Login
            </Link>
            <Link to="/register" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              Añadir Usuario
            </Link>
          </nav>

          {/* Bienvenida al usuario */}
          <div className="flex items-center">
            <span className="text-gray-300 mr-2">Bienvenido,</span>
            <span className="text-white font-medium">Usuario</span>
            <FaUser className="text-white ml-2" />
          </div>
        </div>
      </div>
    </header>
  );
};