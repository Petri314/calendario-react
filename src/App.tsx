import React from 'react';
import NavigationMenu from './NavigationMenu';
import RotativeShiftCalendar from './RotativeShiftCalendar';
import './styles.css';

const App: React.FC = () => {
  return (
    <div>
      <NavigationMenu />
      <main className="container mx-auto p-4">
        <section id="calendario">
          <RotativeShiftCalendar />
        </section>
      </main>
    </div>
  );
};

export default App;
