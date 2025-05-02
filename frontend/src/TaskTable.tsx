import React from 'react';
import { Task } from './interfaces/Task';

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 table-auto"> {/* Añadida la clase table-auto */}
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b-2 border-gray-300 !py-3 !px-6">Cámara</th> {/* Añadido !important */}
            <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b-2 border-gray-300 !py-3 !px-6">Apilador</th> {/* Añadido !important */}
            <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b-2 border-gray-300 !py-3 !px-6">Hora</th> {/* Añadido !important */}
            <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b-2 border-gray-300 !py-3 !px-6">Pasillo</th> {/* Añadido !important */}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id || task.id}>
              <td className="py-4 px-6 border-b !py-4 !px-6">{task.camera}</td> {/* Añadido !important */}
              <td className="py-4 px-6 border-b !py-4 !px-6">{task.worker}</td> {/* Añadido !important */}
              <td className="py-4 px-6 border-b !py-4 !px-6">{`${task.startTime} - ${task.endTime}`}</td> {/* Añadido !important */}
              <td className="py-4 px-6 border-b !py-4 !px-6">{task.aisle}</td> {/* Añadido !important */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;