import React, { useState } from 'react';
import { useLogin } from './hooks/LoginForm.hooks';

export const LoginFormComponent: React.FC = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin({
    onSuccess: (data) => {
      console.log('Login exitoso', data);
      // Manejar el éxito del login
    },
    onError: (error) => {
      console.error('Error en el login', error);
      // Manejar el error
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ dni, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Iniciar Sesión</h2>
        
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
        
        {/* Submit Button */}
        <button 
          type="submit"
          disabled={loginMutation.isPending}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 
            ${
            loginMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        {/* Error & Success Messages */}
        {loginMutation.isError && (
          <p className="text-red-600 text-center mt-4">Error: {loginMutation.error.message}</p>
        )}
        {loginMutation.isSuccess && (
          <p className="text-green-600 text-center mt-4">Inicio de sesión exitoso!</p>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500">
          ¿No tienes cuenta? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Regístrate</a>
        </div>
      </form>
    </div>
  );
};
