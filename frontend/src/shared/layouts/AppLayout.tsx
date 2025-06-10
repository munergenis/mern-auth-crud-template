import { Outlet } from 'react-router';
import { ThemeToggle } from '../components/ThemeToggle';

export const AppLayout = () => {
  return (
    <div className="main-app">
      <header>
        This is navbar <ThemeToggle />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
