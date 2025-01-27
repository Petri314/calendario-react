import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskTable.css'; // Asegúrate de tener un archivo CSS para los estilos

interface Task {
  _id?: string;
  worker: string;
  day: string;
  task: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Obtener tareas de la API
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las tareas", error);
      });
  }, []);

  return (
    <div>
      <h2>Repos de hoy</h2>
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
              <td>{task.worker}</td>
              <td>{task.day}</td>
              <td>{task.task}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
