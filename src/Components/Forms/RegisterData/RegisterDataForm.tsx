import React, { useState } from 'react';
import { useRegisterHour } from './hooks/RegisterDate.hooks';

export const RegisterDataForm: React.FC = () => {
  const [morningData, setMorningData] = useState({ date: '', startHour: '', endHour: '', totalHours: undefined as number | undefined, kilometers: 0, location: '', isRunning: false });
  const [afternoonData, setAfternoonData] = useState({ date: '', startHour: '', endHour: '', totalHours: undefined as number | undefined, kilometers: 0, location: '', isRunning: false });
  const [nightData, setNightData] = useState({ date: '', startHour: '', endHour: '', totalHours: undefined as number | undefined, kilometers: 0, location: '', isRunning: false });

  const { mutate: registerHour, isPending } = useRegisterHour();

  const handleStart = (setPeriodData: React.Dispatch<React.SetStateAction<any>>, date: string) => {
    if (!date) {
      alert('Por favor, seleccione una fecha antes de iniciar.');
      return;
    }
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPeriodData((prevData: any) => ({ ...prevData, startHour: currentTime, isRunning: true }));
  };

  const handleStop = (setPeriodData: React.Dispatch<React.SetStateAction<any>>, startHour: string) => {
    if (!startHour) {
      alert('Por favor, inicie el contador antes de detenerlo.');
      return;
    }
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPeriodData((prevData: any) => ({ ...prevData, endHour: currentTime, isRunning: false }));

    const [startH, startM] = startHour.split(':').map(Number);
    const [endH, endM] = currentTime.split(':').map(Number);
    const start = new Date();
    const end = new Date();
    start.setHours(startH, startM);
    end.setHours(endH, endM);

    const hoursWorked = Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60);
    setPeriodData((prevData: any) => ({ ...prevData, totalHours: hoursWorked }));
  };

  const handleSubmit = (period: 'morning' | 'afternoon' | 'night', data: any) => {
    const missingFields = [];
    if (!data.date) missingFields.push('Fecha');
    if (!data.startHour) missingFields.push('Hora de inicio');
    if (!data.endHour) missingFields.push('Hora de fin');
    if (data.totalHours === undefined) missingFields.push('Total de horas');
    if (!data.kilometers) missingFields.push('Kilómetros');
    if (!data.location) missingFields.push('Ubicación');

    if (missingFields.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${missingFields.join(', ')}`);
      return;
    }

    registerHour(data);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Horas</h2>

      {['morning', 'afternoon', 'night'].map((period) => {
        const periodData = period === 'morning' ? morningData : period === 'afternoon' ? afternoonData : nightData;
        const setPeriodData = period === 'morning' ? setMorningData : period === 'afternoon' ? setAfternoonData : setNightData;

        return (
          <div key={period} className="mb-6 pb-4 border-b">
            <h3 className="text-lg font-semibold capitalize mb-2">{period}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-2 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={periodData.date}
                  onChange={(e) => setPeriodData((prevData) => ({ ...prevData, date: e.target.value }))}
                  className="w-full p-1 text-sm border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
                <input
                  type="time"
                  value={periodData.startHour}
                  onChange={(e) => setPeriodData((prevData) => ({ ...prevData, startHour: e.target.value }))}
                  className="w-full p-1 text-sm border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                <input
                  type="time"
                  value={periodData.endHour}
                  onChange={(e) => setPeriodData((prevData) => ({ ...prevData, endHour: e.target.value }))}
                  className="w-full p-1 text-sm border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Horas</label>
                <input
                  type="number"
                  value={periodData.totalHours || ''}
                  onChange={(e) => setPeriodData((prevData) => ({ ...prevData, totalHours: Number(e.target.value) }))}
                  className="w-full p-1 text-sm border rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kilómetros</label>
                <input
                  type="number"
                  value={periodData.kilometers}
                  onChange={(e) => setPeriodData((prevData) => ({ ...prevData, kilometers: Number(e.target.value) }))}
                  className="w-full p-1 text-sm border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={periodData.location}
                  onChange={(e) => setPeriodData((prevData) => ({ ...prevData, location: e.target.value }))}
                  className="w-full p-1 text-sm border rounded"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleStart(setPeriodData, periodData.date)}
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
                  onClick={() => handleStop(setPeriodData, periodData.startHour)}
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
    </div>
  );
};