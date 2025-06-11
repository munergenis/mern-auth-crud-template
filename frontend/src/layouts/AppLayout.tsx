import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Outlet } from 'react-router';

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
