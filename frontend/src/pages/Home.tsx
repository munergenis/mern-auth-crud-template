import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const Home = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      Optional Landing Page
      <div className="flex gap-2">
        <Button asChild>
          <Link to={'/login'}>Login</Link>
        </Button>
        <Button
          asChild
          variant={'outline'}
        >
          <Link to={'register'}>Register</Link>
        </Button>
      </div>
    </div>
  );
};
