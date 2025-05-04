import React from 'react';
import NavigationMenu from "./NavigationMenu";
import RotativeShiftCalendar from "./RotativeShiftCalendar";
import RepoTable from "./components/RepoTable";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div>
      <NavigationMenu />
      <main className="container mx-auto p-4">
        <section id="calendario">
          <RotativeShiftCalendar />
        </section>
      </main>
      <section id="repo" className="mt-8 w-full mx-auto">
        <div className="mt-6 overflow-x-auto w-full">
          <div className="w-full">
            <RepoTable />
          </div>
        </div>
      </section>
      {/* El resto de tu código */}
    </div>
  );
};

export default App;