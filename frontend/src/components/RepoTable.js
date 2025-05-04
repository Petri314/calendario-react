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
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="mt-6 text-gray-600 italic">Cargando datos...</div>;
  }

  if (error) {
    return <div className="mt-6 text-red-500">Error al cargar los datos: {error.message}</div>;
  }

  const getApiladorForTask = (task) => {
    if (task.Camara === "Congelado") {
      const now = currentTime;
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      const [startHourStr, startMinuteStr] = task["Hora Inicio"].split(':');
      const [endHourStr, endMinuteStr] = task["Hora fin"].split(':');
      const [breakStartHourStr, breakStartMinuteStr] = task["Hora break inicio"] ? task["Hora break inicio"].split(':') : [null, null];
      const [breakEndHourStr, breakEndMinuteStr] = task["Hora break fin"] ? task["Hora break fin"].split(':') : [null, null];

      const startTimeInMinutes = parseInt(startHourStr) * 60 + parseInt(startMinuteStr);
      const endTimeInMinutes = parseInt(endHourStr) * 60 + parseInt(endMinuteStr);
      const breakStartTimeInMinutes = breakStartHourStr && breakStartMinuteStr ? parseInt(breakStartHourStr) * 60 + parseInt(breakStartMinuteStr) : null;
      const breakEndTimeInMinutes = breakEndHourStr && breakEndMinuteStr ? parseInt(breakEndHourStr) * 60 + parseInt(breakEndMinuteStr) : null;

      const isNightShift = endTimeInMinutes < startTimeInMinutes;

      const isBeforeBreak = isNightShift
        ? (currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes < breakStartTimeInMinutes)
          && currentTimeInMinutes < (breakStartTimeInMinutes + (endTimeInMinutes < startTimeInMinutes ? 24 * 60 : 0))
        : currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < breakStartTimeInMinutes;

      if (isBeforeBreak) {
        return task.Apilador.split(' / ')[0]?.trim();
      } else {
        return task.Apilador;
      }
    } else {
      if (task.Apilador.includes('/')) {
        return task.Apilador.split(' / ')[0]?.trim() || task.Apilador;
      }
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

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Repo Noche</h2>
      <p className="text-sm text-gray-500 mb-2">Hora actual: {currentTime.toLocaleTimeString()}</p>
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
            {tasks.map((task, index) => {
              const now = currentTime;
              const currentHour = now.getHours();
              const currentMinute = now.getMinutes();
              const currentTimeInMinutes = currentHour * 60 + currentMinute;

              const [breakStartHourStr, breakStartMinuteStr] = task["Hora break inicio"] ? task["Hora break inicio"].split(':') : [null, null];
              const [breakEndHourStr, breakEndMinuteStr] = task["Hora break fin"] ? task["Hora break fin"].split(':') : [null, null];

              const breakStartTimeInMinutes = breakStartHourStr && breakStartMinuteStr ? parseInt(breakStartHourStr) * 60 + parseInt(breakStartMinuteStr) : null;
              const breakEndTimeInMinutes = breakEndHourStr && breakEndMinuteStr ? parseInt(breakEndHourStr) * 60 + parseInt(breakEndMinuteStr) : null;

              const [startHourStr, startMinuteStr] = task["Hora Inicio"].split(':');
              const [endHourStr, endMinuteStr] = task["Hora fin"].split(':');
              const startTimeInMinutes = parseInt(startHourStr) * 60 + parseInt(startMinuteStr);
              const endTimeInMinutes = parseInt(endHourStr) * 60 + parseInt(endMinuteStr);
              const isNightShift = endTimeInMinutes < startTimeInMinutes;

              let isBreakTime = false;
              if (breakStartTimeInMinutes !== null && breakEndTimeInMinutes !== null) {
                const adjustedBreakEndTimeInMinutes = isNightShift && breakEndTimeInMinutes < breakStartTimeInMinutes
                  ? breakEndTimeInMinutes + 24 * 60
                  : breakEndTimeInMinutes;

                isBreakTime = currentTimeInMinutes >= breakStartTimeInMinutes && currentTimeInMinutes < adjustedBreakEndTimeInMinutes;
              }

              return (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} ${getCameraRowClass(task.Camara)}`}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{task.Camara}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{getApiladorForTask(task)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">
                    {isBreakTime ? "Break" : "22:00 - 02:45"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{task.Pasillo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RepoTable;