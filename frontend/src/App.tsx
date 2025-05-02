import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationMenu from "./NavigationMenu";
import RotativeShiftCalendar from "./RotativeShiftCalendar";
import TaskTable from "./TaskTable";
import "./styles.css";
import { Task } from "./interfaces/Task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>("");
  const [newTask, setNewTask] = useState<Task>({
    worker: "",
    day: "",
    task: "",
    startTime: "",
    endTime: "",
    aisle: "",
  });

  // Variable para controlar si el formulario se muestra o no
  const mostrarFormulario = true; // Cambia esto a `false` para ocultar el formulario

  // Obtener tareas del backend
  useEffect(() => {
    console.log("App.tsx: Intentando obtener tareas desde http://localhost:5000/tasks");
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        console.log("App.tsx: Datos recibidos del backend:", response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("App.tsx: Hubo un error al obtener las tareas", error);
      });
  }, []);

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        console.log("App.tsx: Tarea agregada con éxito:", response.data);
        setTasks([...tasks, response.data]);
        setNewTask({ worker: "", day: "", task: "", startTime: "", endTime: "", aisle: "" });
        setMessage("Tarea agregada con éxito!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("App.tsx: Error al agregar tarea:", error);
        setMessage("Error al agregar la tarea.");
        setTimeout(() => setMessage(""), 3000);
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

        {/* Condicional para mostrar el formulario */}
        {mostrarFormulario && (
          <section id="agregar-tarea" className="mt-4">
            <h2>Agregar Nueva Tarea (Solo para Administradores - Protección en Frontend)</h2>
            {message && <div className={`alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>{message}</div>}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="worker" className="block text-gray-700 text-sm font-bold mb-2">Apilador:</label>
                <input
                  type="text"
                  id="worker"
                  name="worker"
                  value={newTask.worker}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="day" className="block text-gray-700 text-sm font-bold mb-2">Día:</label>
                <input
                  type="text"
                  id="day"
                  name="day"
                  value={newTask.day}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="task" className="block text-gray-700 text-sm font-bold mb-2">Tarea:</label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={newTask.task}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">Hora de Inicio:</label>
                <input
                  type="text"
                  id="startTime"
                  name="startTime"
                  value={newTask.startTime}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">Hora de Fin:</label>
                <input
                  type="text"
                  id="endTime"
                  name="endTime"
                  value={newTask.endTime}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="aisle" className="block text-gray-700 text-sm font-bold mb-2">Pasillo:</label>
                <input
                  type="text"
                  id="aisle"
                  name="aisle"
                  value={newTask.aisle}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar Tarea
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;