import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface LoginData {
  dni: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

const loginForm = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error en la autenticación');
  }

  return response.json();
};

export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginData>) => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginForm,
    ...options,
  });
};