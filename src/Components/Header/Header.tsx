import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className=" bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <div>
        {/* Aquí puedes agregar íconos o información del usuario */}
        <span className="text-white">Bienvenido, Usuario</span>
      </div>
    </header>
  );
};

