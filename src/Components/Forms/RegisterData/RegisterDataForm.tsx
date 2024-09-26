import React, { useState } from 'react';
import { useRegisterHour } from './hooks/RegisterDate.hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PeriodData {
  date: string;
  timePeriod: 'morning' | 'afternoon' | 'night';
  startHour: string;
  endHour: string;
  totalHours: number | undefined;
  totalMinutes: number | undefined;
  kilometers: number;
  location: string;
  isRunning: boolean;
}

interface FieldErrors {
  date?: string;
  startHour?: string;
  endHour?: string;
  kilometers?: string;
  location?: string;
}

export const RegisterDataForm: React.FC = () => {
  const [morningData, setMorningData] = useState<PeriodData>({
    date: '',
    timePeriod: 'morning',
    startHour: '',
    endHour: '',
    totalHours: undefined,
    totalMinutes: undefined,
    kilometers: 0,
    location: '',
    isRunning: false
  });

  const [afternoonData, setAfternoonData] = useState<PeriodData>({
    date: '',
    timePeriod: 'afternoon',
    startHour: '',
    endHour: '',
    totalHours: undefined,
    totalMinutes: undefined,
    kilometers: 0,
    location: '',
    isRunning: false
  });

  const [nightData, setNightData] = useState<PeriodData>({
    date: '',
    timePeriod: 'night',
    startHour: '',
    endHour: '',
    totalHours: undefined,
    totalMinutes: undefined,
    kilometers: 0,
    location: '',
    isRunning: false
  });

  const [errors, setErrors] = useState<{ [key: string]: FieldErrors }>({
    morning: {},
    afternoon: {},
    night: {}
  });

  const { mutate: registerHour, isPending } = useRegisterHour();

  const validateField = (field: keyof PeriodData, value: any, period: string) => {
    let error = '';
    switch (field) {
      case 'date':
        if (!value) error = 'La fecha es requerida';
        break;
      case 'startHour':
        if (!value) error = 'La hora de inicio es requerida';
        break;
      case 'endHour':
        if (!value) error = 'La hora de fin es requerida';
        break;
      case 'kilometers':
        if (value <= 0) error = 'Los kilómetros deben ser mayores a 0';
        break;
      case 'location':
        if (!value) error = 'La ubicación es requerida';
        break;
    }
    setErrors(prev => ({
      ...prev,
      [period]: { ...prev[period], [field]: error }
    }));
    return !error;
  };

  const handleStart = (setPeriodData: React.Dispatch<React.SetStateAction<PeriodData>>, date: string, period: string) => {
    if (!validateField('date', date, period)) {
      toast.error('Por favor, seleccione una fecha antes de iniciar.');
      return;
    }
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPeriodData((prevData) => ({ ...prevData, startHour: currentTime, isRunning: true }));
    toast.success('Contador iniciado');
  };

  const handleStop = (setPeriodData: React.Dispatch<React.SetStateAction<PeriodData>>, startHour: string, period: string) => {
    if (!validateField('startHour', startHour, period)) {
      toast.error('Por favor, inicie el contador antes de detenerlo.');
      return;
    }
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPeriodData((prevData) => ({ ...prevData, endHour: currentTime, isRunning: false }));

    const [startH, startM] = startHour.split(':').map(Number);
    const [endH, endM] = currentTime.split(':').map(Number);
    const start = new Date();
    const end = new Date();
    start.setHours(startH, startM);
    end.setHours(endH, endM);

    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setPeriodData((prevData) => ({
      ...prevData,
      totalHours: hours,
      totalMinutes: minutes
    }));
    toast.success('Contador detenido');
  };

  const handleSubmit = (period: 'morning' | 'afternoon' | 'night', data: PeriodData) => {
    const fields: (keyof PeriodData)[] = ['date', 'startHour', 'endHour', 'kilometers', 'location'];
    const isValid = fields.every(field => validateField(field, data[field], period));

    if (!isValid) {
      toast.error('Por favor, corrija los errores antes de enviar.');
      return;
    }

    registerHour({
      date: data.date,
      timePeriod: data.timePeriod,
      startHour: data.startHour,
      endHour: data.endHour,
      totalHours: data.totalHours !== undefined ? data.totalHours + (data.totalMinutes || 0) / 60 : undefined,
      kilometers: data.kilometers,
      location: data.location
    });
    toast.success('Registro enviado con éxito');
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Horas</h2>

      {['morning', 'afternoon', 'night'].map((period) => {
        const periodData = period === 'morning' ? morningData : period === 'afternoon' ? afternoonData : nightData;
        const setPeriodData = period === 'morning' ? setMorningData : period === 'afternoon' ? setAfternoonData : setNightData;
        const periodErrors = errors[period];

        return (
          <div key={period} className="mb-6 pb-4 border-b">
            <h3 className="text-lg font-semibold capitalize mb-2">{period}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-2 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={periodData.date}
                  onChange={(e) => {
                    setPeriodData((prevData) => ({ ...prevData, date: e.target.value }));
                    validateField('date', e.target.value, period);
                  }}
                  className={`w-full p-1 text-sm border rounded ${periodErrors.date ? 'border-red-500' : ''}`}
                />
                {periodErrors.date && <p className="text-red-500 text-xs mt-1">{periodErrors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
                <input
                  type="time"
                  value={periodData.startHour}
                  className="w-full p-1 text-sm border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                <input
                  type="time"
                  value={periodData.endHour}
                  className="w-full p-1 text-sm border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiempo Transcurrido</label>
                <input
                  type="text"
                  value={
                    periodData.totalHours !== undefined && periodData.totalMinutes !== undefined
                      ? `${periodData.totalHours}h ${periodData.totalMinutes}m`
                      : ''
                  }
                  className="w-full p-1 text-sm border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kilómetros</label>
                <input
                  type="number"
                  value={periodData.kilometers}
                  onChange={(e) => {
                    setPeriodData((prevData) => ({ ...prevData, kilometers: Number(e.target.value) }));
                    validateField('kilometers', Number(e.target.value), period);
                  }}
                  className={`w-full p-1 text-sm border rounded ${periodErrors.kilometers ? 'border-red-500' : ''}`}
                />
                {periodErrors.kilometers && <p className="text-red-500 text-xs mt-1">{periodErrors.kilometers}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={periodData.location}
                  onChange={(e) => {
                    setPeriodData((prevData) => ({ ...prevData, location: e.target.value }));
                    validateField('location', e.target.value, period);
                  }}
                  className={`w-full p-1 text-sm border rounded ${periodErrors.location ? 'border-red-500' : ''}`}
                />
                {periodErrors.location && <p className="text-red-500 text-xs mt-1">{periodErrors.location}</p>}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleStart(setPeriodData, periodData.date, period)}
                  className={`w-full px-2 py-1 rounded text-sm ${
                    periodData.isRunning
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                  disabled={periodData.isRunning}
                >
                  Start
                </button>
              </div>
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={() => handleStop(setPeriodData, periodData.startHour, period)}
                  className={`flex-1 px-2 py-1 rounded text-sm ${
                    !periodData.isRunning
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  disabled={!periodData.isRunning}
                >
                  Stop
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(period as 'morning' | 'afternoon' | 'night', periodData)}
                  className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                  disabled={isPending || periodData.isRunning}
                >
                  {isPending ? '...' : 'Agregar'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <ToastContainer />
    </div>
  );
};