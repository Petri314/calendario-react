import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskTable.css'; // Asegúrate de tener un archivo CSS para los estilos

interface Task {
  _id?: string;
  worker: string;
  day: string;
  task: string;
  startTime: string;
  endTime: string;
  aisle: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Actualizar la hora actual cada minuto
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Obtener tareas de la API
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las tareas", error);
      });

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container">
      <h2>Repo Fiambrería</h2>
      <table>
        <thead>
          <tr>
            <th>Apilador</th>
            <th>Día y hora</th>
            <th>Pasillo</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td data-title="Apilador">{task.worker}</td>
              <td data-title="Día y hora">{`De ${task.startTime} a ${task.endTime} el ${task.day}`}</td>
              <td data-title="Pasillo">{task.aisle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Hora actual: {formatTime(currentTime)}</p>
    </div>
  );
};

export default TaskTable;
