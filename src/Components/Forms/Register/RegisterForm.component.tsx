import React, { useState } from 'react';
import { useRegister } from './hooks/RegisterForm.hooks';

export const RegisterFormComponent: React.FC = () => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  const registerMutation = useRegister({
    onSuccess: (data) => {
      console.log('Registro exitoso', data);
    },
    onError: (error) => {
      console.error('Error en el registro', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ dni, email, username, password, phone });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Añadir Usuario</h2>

        {/* DNI Field */}
        <div>
          <label htmlFor="dni" className="block text-lg font-medium text-gray-700">DNI</label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            placeholder="Ingrese su DNI"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingrese su email"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-lg font-medium text-gray-700">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ingrese su nombre de usuario"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingrese su contraseña"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Ingrese su teléfono"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={registerMutation.isPending}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 
            ${registerMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {registerMutation.isPending ? 'Registrando...' : 'Registrarse'}
        </button>

        {/* Error & Success Messages */}
        {registerMutation.isError && (
          <p className="text-red-600 text-center mt-4">Error: {registerMutation.error.message}</p>
        )}
        {registerMutation.isSuccess && (
          <p className="text-green-600 text-center mt-4">Registro exitoso!</p>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500">
          ¿Ya tienes cuenta? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Inicia sesión</a>
        </div>
      </form>
    </div>
  );
};
