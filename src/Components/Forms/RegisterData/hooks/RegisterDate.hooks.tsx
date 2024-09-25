import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface RegisterHourData {
  date: string;                // La fecha del registro
  timePeriod: 'morning' | 'afternoon' | 'night'; // Periodo del día
  startHour: string;          // La hora de inicio
  endHour?: string;           // La hora de fin (opcional hasta que se detenga)
  totalHours?: number;        // Horas transcurridas (opcional)
  kilometers: number;         // Kilómetros recorridos
  location: string;           // Ubicación
}

interface RegisterHourResponse {
  message: string;            // Mensaje de éxito o error del servidor
  // Puedes añadir más propiedades si el backend devuelve más información
}

// Función para registrar las horas
const registerHour = async (data: RegisterHourData): Promise<RegisterHourResponse> => {
  const response = await fetch('http://localhost:5000/register_hour', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al registrar la hora');
  }

  return response.json();
};

// Hook para usar la mutación de registro de horas
export const useRegisterHour = (options?: UseMutationOptions<RegisterHourResponse, Error, RegisterHourData>) => {
  return useMutation<RegisterHourResponse, Error, RegisterHourData>({
    mutationFn: registerHour,
    ...options,
  });
};
