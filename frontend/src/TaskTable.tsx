import React from 'react';
import './TaskTable.css';
import { Task } from './interfaces/Task';

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  return (
    <div className="container">
      <h2>Repo Fiambrería</h2>
      <table>
        <thead>
          <tr>
            <th>Apilador</th>
            <th>Hora</th>
            <th>Pasillo</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task?._id || task?.id}> {/* Usando _id si existe, sino id */}
              <td data-title="Apilador">{task?.worker || 'N/A'}</td>
              <td data-title="Hora">{`${task?.startTime || 'N/A'} - ${task?.endTime || 'N/A'}`}</td>
              <td data-title="Pasillo">{task?.aisle || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;