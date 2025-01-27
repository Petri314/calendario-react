import React from 'react';
import NavigationMenu from './NavigationMenu';
import RotativeShiftCalendar from './RotativeShiftCalendar';
import TaskTable from './TaskTable';
import './styles.css';

const App: React.FC = () => {
  return (
    <div>
      <NavigationMenu />
      <main className="container mx-auto p-4">
        <section id="calendario">
          <RotativeShiftCalendar />
        </section>
        <section id="repo">
          <TaskTable />
        </section>
      </main>
    </div>
  );
};

export default App;
