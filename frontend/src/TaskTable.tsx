import React from 'react';
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

// Definir las props para recibir las tareas desde App.tsx
interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
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
              <td data-title="Día y hora">{`De ${task.startTime || 'N/A'} a ${task.endTime || 'N/A'} el ${task.day}`}</td>
              <td data-title="Pasillo">{task.aisle || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
