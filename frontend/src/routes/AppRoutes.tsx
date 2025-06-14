import { HAS_LANDING } from '@/config/appConfig';
import DashboardLayout from '@/layouts/DashboardLayout';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Navigate, Route, Routes } from 'react-router';

const Landing = () =>
  HAS_LANDING ? (
    <Home />
  ) : (
    <Navigate
      to={'/login'}
      replace
    />
  );

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* PUBLIC ROUTES */}
        <Route
          index
          element={<Landing />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />

        {/* PRIVATE ROUTES */}
        <Route element={<DashboardLayout />}>
          <Route
            path="dashboard"
            element={<div>Here goes private routes</div>}
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to={'/'}
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
