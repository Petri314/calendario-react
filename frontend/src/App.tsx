import React from 'react';
import NavigationMenu from "./NavigationMenu";
import RotativeShiftCalendar from "./RotativeShiftCalendar";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div>
      <NavigationMenu />
      <main className="container mx-auto p-4">
        <section id="calendario">
          <RotativeShiftCalendar />
        </section>
        {/* <section id="repo">
          <h2>Tareas</h2>
          <TaskTable tasks={[]} />
        </section>

        {false && (
          <section id="agregar-tarea" className="mt-4">
            <h2>Agregar Nueva Tarea</h2>
            <form className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="camera" className="block text-gray-700 text-sm font-bold mb-2">Cámara:</label>
                <input type="text" id="camera" name="camera" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="worker" className="block text-gray-700 text-sm font-bold mb-2">Apilador:</label>
                <input type="text" id="worker" name="worker" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">Hora de Inicio:</label>
                <input type="text" id="startTime" name="startTime" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">Hora de Fin:</label>
                <input type="text" id="endTime" name="endTime" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="aisle" className="block text-gray-700 text-sm font-bold mb-2">Pasillo:</label>
                <input type="text" id="aisle" name="aisle" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="col-span-2">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Agregar Tarea
                </button>
              </div>
            </form>
          </section>
        )} */}
      </main>
    </div>
  );
};

export default App;