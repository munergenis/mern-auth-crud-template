import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Outlet } from 'react-router';

interface AppLayoutProps {
  isPublic?: boolean;
}

export const AppLayout = ({ isPublic = true }: AppLayoutProps) => {
  return (
    <div className="main-app">
      <header>
        This is navbar for {isPublic ? 'public' : 'private'} layout{' '}
        <ThemeToggle />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
