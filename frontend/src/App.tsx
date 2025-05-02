import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationMenu from "./NavigationMenu";
import RotativeShiftCalendar from "./RotativeShiftCalendar";
import TaskTable from "./TaskTable";
import { Task } from "./interfaces/Task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>("");
  const [newTask, setNewTask] = useState<Task>({
    worker: "",
    startTime: "",
    endTime: "",
    aisle: "",
    category: "unica", // Manteniendo una categoría única
    camera: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tasks`) // Cambiado a /tasks
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(`Error al obtener tareas`, error));
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/tasks`, newTask) // Cambiado a /tasks
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask({ worker: "", startTime: "", endTime: "", aisle: "", category: "unica", camera: "" });
        setMessage(`Tarea agregada con éxito!`);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error al agregar la tarea:", error);
        setMessage(`Error al agregar la tarea.`);
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
          <h2>Tareas</h2>
          <TaskTable tasks={tasks} />
        </section>

        {mostrarFormulario && (
          <section id="agregar-tarea" className="mt-4">
            <h2>Agregar Nueva Tarea</h2>
            {message && <div className={`alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>{message}</div>}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="camera" className="block text-gray-700 text-sm font-bold mb-2">Cámara:</label>
                <input type="text" id="camera" name="camera" value={newTask.camera} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="worker" className="block text-gray-700 text-sm font-bold mb-2">Apilador:</label>
                <input type="text" id="worker" name="worker" value={newTask.worker} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">Hora de Inicio:</label>
                <input type="text" id="startTime" name="startTime" value={newTask.startTime} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">Hora de Fin:</label>
                <input type="text" id="endTime" name="endTime" value={newTask.endTime} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="aisle" className="block text-gray-700 text-sm font-bold mb-2">Pasillo:</label>
                <input type="text" id="aisle" name="aisle" value={newTask.aisle} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="col-span-2">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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