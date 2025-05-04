import React, { useState, useEffect } from 'react';

function RepoTable() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualizar la hora cada segundo

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  if (loading) {
    return <div className="mt-6 text-gray-600 italic">Cargando datos...</div>;
  }

  if (error) {
    return <div className="mt-6 text-red-500">Error al cargar los datos: {error.message}</div>;
  }

  const getApiladorForTask = (task) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const [startHourStr, startMinuteStr] = task["Hora Inicio"].split(':');
    const [endHourStr, endMinuteStr] = task["Hora fin"].split(':');
    const [breakStartHourStr, breakStartMinuteStr] = task["Hora break inicio"].split(':');
    const [breakEndHourStr, breakEndMinuteStr] = task["Hora break fin"].split(':');

    const startHour = parseInt(startHourStr);
    const startMinute = parseInt(startMinuteStr);
    const endHour = parseInt(endHourStr);
    const endMinute = parseInt(endMinuteStr);
    const breakStartHour = parseInt(breakStartHourStr);
    const breakStartMinute = parseInt(breakStartMinuteStr);
    const breakEndHour = parseInt(breakEndHourStr);
    const breakEndMinute = parseInt(breakEndMinuteStr);

    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const breakStartTimeInMinutes = breakStartHour * 60 + breakStartMinute;
    const breakEndTimeInMinutes = breakEndHour * 60 + breakEndMinute;

    const camerasWithShiftChange = ["Congelado", "Seco", "Tropicales", "Fiambreria"];

    if (camerasWithShiftChange.includes(task.Camara) && task.Apilador.includes('/')) {
      const [preBreakApilador, postBreakApilador] = task.Apilador.split(' / ');
      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < breakStartTimeInMinutes) {
        return preBreakApilador.trim();
      } else if (currentTimeInMinutes >= breakEndTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        return postBreakApilador.trim();
      } else {
        return task.Apilador;
      }
    } else {
      return task.Apilador;
    }
  };

  const getCameraRowClass = (camara) => {
    switch (camara) {
      case "Congelado": return "camara-celda bg-blue-100";
      case "Seco": return "camara-celda bg-green-100";
      case "Tropicales": return "camara-celda bg-yellow-100";
      case "Panaderia": return "camara-celda bg-orange-100";
      case "Vegetales": return "camara-celda bg-purple-100";
      case "Carnes": return "camara-celda bg-red-100";
      case "Ekono": return "camara-celda bg-teal-100";
      case "Fiambreria": return "camara-celda bg-pink-100";
      default: return "";
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Repo Noche</h2>
      <p className="text-sm text-gray-500 mb-2">Hora actual: {formatTime(currentTime)}</p>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full w-full bg-white shadow-md rounded-lg border-collapse border-spacing-0">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Cámara</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Apilador</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Hora</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Pasillo</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} ${getCameraRowClass(task.Camara)}`}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{task.Camara}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{getApiladorForTask(task)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{task["Hora Inicio"]} - {task["Hora fin"]}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{task.Pasillo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RepoTable;