import { Home } from '@/pages/Home';
import { AppLayout } from '@/shared/layouts/AppLayout';
import { Route, Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
      >
        <Route
          index
          element={<Home />}
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
