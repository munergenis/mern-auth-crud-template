import { HAS_LANDING } from '@/config/appConfig';
import DashboardLayout from '@/layouts/DashboardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { RootLayout } from '@/layouts/RootLayout';
import { ForgotPassword } from '@/pages/public/ForgotPassword';
import { Home } from '@/pages/public/Home';
import { Login } from '@/pages/public/Login';
import { Register } from '@/pages/public/Register';
import { ResetPassword } from '@/pages/public/ResetPassword';
import { VerifyEmail } from '@/pages/public/VerifyEmail';
import { Navigate, Route, Routes } from 'react-router';
import { AuthGuard } from './AuthGuard';
import { VerifyEmailInfo } from '@/pages/public/VerifyEmailInfo';
import { Sessions } from '@/pages/private/Sessions';

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
            path="email/verify"
            element={<VerifyEmailInfo />}
          />
          <Route
            path="email/verify/:code"
            element={<VerifyEmail />}
          />
          <Route
            path="password/forgot"
            element={<ForgotPassword />}
          />
          <Route
            path="password/reset"
            element={<ResetPassword />}
          />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="dashboard"
              element={<div>Here is the dashboard</div>}
            />
            <Route
              path="sessions"
              element={<Sessions />}
            />
          </Route>
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
