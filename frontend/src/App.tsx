import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationMenu from './NavigationMenu';
import RotativeShiftCalendar from './RotativeShiftCalendar';
import TaskTable from './TaskTable';
import './styles.css';

interface Task {
  _id?: string;
  worker: string;
  day: string;
  task: string;
  startTime: string;
  endTime: string;
  aisle: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>('');
  const [newTask, setNewTask] = useState<Task>({
    worker: '',
    day: '',
    task: '',
    startTime: '',
    endTime: '',
    aisle: ''
  });

  // Obtener tareas del backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las tareas", error);
      });
  }, []);

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hacer la solicitud POST para agregar la nueva tarea
    axios.post('http://localhost:5000/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]); // Agregar la nueva tarea a la lista
        setNewTask({
          worker: '',
          day: '',
          task: '',
          startTime: '',
          endTime: '',
          aisle: ''
        }); // Limpiar el formulario
      })
      .catch(error => {
        console.error('Error al agregar tarea:', error);
      });
  };

  return (
    <div>
      <NavigationMenu />
      <main className="container mx-auto p-4">
        <section id="calendario">
          <RotativeShiftCalendar />
        </section>
        <section id="repo">
          <TaskTable tasks={tasks} />
        </section>

        {/* Formulario para agregar una nueva tarea */}
        <section id="add-task-form">
          <h2>Agregar nueva tarea</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Apilador:
              <input
                type="text"
                name="worker"
                value={newTask.worker}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Día:
              <input
                type="text"
                name="day"
                value={newTask.day}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Tarea:
              <input
                type="text"
                name="task"
                value={newTask.task}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Hora de inicio:
              <input
                type="text"
                name="startTime"
                value={newTask.startTime}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Hora de fin:
              <input
                type="text"
                name="endTime"
                value={newTask.endTime}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Pasillo:
              <input
                type="text"
                name="aisle"
                value={newTask.aisle}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Agregar tarea</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default App;
