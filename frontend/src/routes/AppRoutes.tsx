import { HAS_LANDING } from '@/config/appConfig';
import DashboardLayout from '@/layouts/DashboardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { RootLayout } from '@/layouts/RootLayout';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { VerifyEmail } from '@/pages/VerifyEmail';
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
        <Route element={<PublicLayout />}>
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
          <Route
            path="email/verify/:code"
            element={<VerifyEmail />}
          />
          <Route
            path="password/forgot"
            element={<ForgotPassword />}
          />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<DashboardLayout />}>
          <Route
            path="dashboard"
            element={<div>Here goes private routes</div>}
          />
        </Route>

        {/* NOT_FOUND REDIRECT */}
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
