import { Outlet } from 'react-router';

export const PublicLayout = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Outlet />
    </div>
  );
};
