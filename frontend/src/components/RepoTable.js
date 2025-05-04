import React, { useState, useEffect } from 'react';

function RepoTable() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [turnoActual, setTurnoActual] = useState(null);
  const [diaSemana, setDiaSemana] = useState('');

  const turnos = {
    Mañana: { entrada: 6 * 60 + 40, inicioBreak: 10 * 60 + 30, finBreak: 11 * 60, salida: 14 * 60 + 10 },
    Tarde: { entrada: 14 * 60 + 20, inicioBreak: 18 * 60 + 40, finBreak: 19 * 60 + 10, salida: 21 * 60 + 55 },
    Noche: { entrada: 22 * 60, inicioBreak: 2 * 60 + 45, finBreak: 3 * 60 + 15, salida: 6 * 60 + 5 + 24 * 60 },
  };

  const getTurnoActual = () => {
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    if (nowMinutes >= turnos.Mañana.entrada && nowMinutes < turnos.Mañana.salida) {
      return "Mañana";
    } else if (nowMinutes >= turnos.Tarde.entrada && nowMinutes < turnos.Tarde.salida) {
      return "Tarde";
    } else if (nowMinutes >= turnos.Noche.entrada || nowMinutes < turnos.Noche.salida) {
      return "Noche";
    }
    return null;
  };

  useEffect(() => {
    const turno = getTurnoActual();
    setTurnoActual(turno);

    const now = new Date();
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    setDiaSemana(dias[now.getDay()]);

    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (turno) {
          const tareasDelTurno = data.filter(tarea => tarea.Turno?.toLowerCase() === turno?.toLowerCase());
          setTasks(tareasDelTurno);
        } else {
          setTasks([]);
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      const now = new Date();
      setDiaSemana(dias[now.getDay()]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="mt-6 text-gray-600 italic">Cargando datos...</div>;
  }

  if (error) {
    return <div className="mt-6 text-red-500">Error al cargar los datos: {error.message}</div>;
  }

  const getTimeInMinutes = (timeString) => {
    if (!timeString) return null;
    const [hourStr, minuteStr] = timeString.split(':');
    return parseInt(hourStr) * 60 + parseInt(minuteStr);
  };

  const getCurrentTimeInMinutes = () => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  };

  const isTimeInBreak = (task, turno) => {
    const nowMinutes = getCurrentTimeInMinutes();
    const breakStartMinutes = turnos[turno]?.inicioBreak;
    const breakEndMinutes = turnos[turno]?.finBreak;

    if (breakStartMinutes !== undefined && breakEndMinutes !== undefined) {
      if (turnos[turno]?.salida < turnos[turno]?.entrada) {
        return nowMinutes >= breakStartMinutes || nowMinutes < breakEndMinutes;
      } else {
        return nowMinutes >= breakStartMinutes && nowMinutes < breakEndMinutes;
      }
    }
    return false;
  };

  const getApiladorForTask = (task) => {
    if (task.Apilador?.includes('/')) {
      const [firstApilador, secondApilador] = task.Apilador.split(' / ').map(name => name.trim());
      if (turnoActual) {
        const breakEndMinutes = turnos[turnoActual]?.finBreak;
        const nowMinutes = getCurrentTimeInMinutes();
        if (breakEndMinutes !== undefined && nowMinutes >= breakEndMinutes) {
          return secondApilador;
        } else {
          return firstApilador;
        }
      } else {
        return firstApilador;
      }
    }
    return task.Apilador;
  };

  const getHoraDisplay = (task) => {
    if (!turnoActual) {
      return "Fuera de horario de turno";
    }

    const nowMinutes = getCurrentTimeInMinutes();
    const startMinutes = getTimeInMinutes(task["Hora Inicio"]);
    const endMinutes = getTimeInMinutes(task["Hora fin"]);
    const breakStartMinutes = getTimeInMinutes(task["Hora break inicio"]);
    const breakEndMinutes = getTimeInMinutes(task["Hora break fin"]);

    if (turnoActual === "Noche") {
      if (breakStartMinutes !== undefined && breakEndMinutes !== undefined) {
        if (nowMinutes >= startMinutes || nowMinutes < breakStartMinutes) {
          return `${task["Hora Inicio"]} - ${task["Hora break inicio"]}`;
        } else if (nowMinutes >= breakEndMinutes && nowMinutes < endMinutes) {
          return `${task["Hora break fin"]} - ${task["Hora fin"]}`;
        } else if (nowMinutes >= breakStartMinutes && nowMinutes < breakEndMinutes) {
          return "Break";
        } else {
          return `${task["Hora Inicio"]} - ${task["Hora fin"]}`; // Fallback
        }
      } else {
        return `${task["Hora Inicio"]} - ${task["Hora fin"]}`; // Si no hay break definido para la noche
      }
    } else { // Turnos Mañana y Tarde
      if (breakStartMinutes !== undefined && breakEndMinutes !== undefined) {
        if (nowMinutes >= startMinutes && nowMinutes < breakStartMinutes) {
          return `${task["Hora Inicio"]} - ${task["Hora break inicio"]}`;
        } else if (nowMinutes >= breakEndMinutes && nowMinutes < endMinutes) {
          return `${task["Hora break fin"]} - ${task["Hora fin"]}`;
        } else if (nowMinutes >= breakStartMinutes && nowMinutes < breakEndMinutes) {
          return "Break";
        } else {
          return `${task["Hora Inicio"]} - ${task["Hora fin"]}`; // Fallback
        }
      } else {
        return `${task["Hora Inicio"]} - ${task["Hora fin"]}`;
      }
    }
  };

  const formatMinutesToTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
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
      <h2 className="text-xl font-semibold mb-2">Repo {turnoActual || 'Sin Turno'}, {diaSemana}</h2>
      <p className="text-sm text-gray-500 mb-2">
        Hora actual: <span className="digital-time">{currentTime.toLocaleTimeString('es-CL', { hour12: false })}</span>
      </p>
      {turnoActual ? (
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
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{getHoraDisplay(task)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900 p-2">{task.Pasillo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-600 italic">No hay tareas programadas para la hora actual.</p>
      )}
    </div>
  );
}

export default RepoTable;