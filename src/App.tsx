import React from 'react';
import NavigationMenu from './NavigationMenu';
import RotativeShiftCalendar from './RotativeShiftCalendar';
import './styles.css';

const App: React.FC = () => {
  return (
    <div>
      <NavigationMenu />
      <main className="container mx-auto p-4">
        <section id="inicio">
          <h1 className="text-3xl font-bold">Inicio</h1>
          <p>Bienvenido a la página principal.</p>
        </section>
        <section id="repo">
          <h1 className="text-3xl font-bold">Repo</h1>
          <p>Contenido del repositorio.</p>
          <RotativeShiftCalendar /> {/* Incluimos el calendario aquí */}
        </section>
        <section id="nosotros">
          <h1 className="text-3xl font-bold">Nosotros</h1>
          <p>Acerca de nosotros.</p>
        </section>
      </main>
    </div>
  );
};

export default App;
