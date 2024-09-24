import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface RegisterData {
  dni: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    dni: string;
    email: string;
    username: string;
    phone: string;
  };
}

const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error en el registro');
  }

  return response.json();
};

export const useRegister = (options?: UseMutationOptions<RegisterResponse, Error, RegisterData>) => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: registerUser,
    ...options,
  });
};
