import { PrivateAppLayout } from '@/layouts/PrivateAppLayout';
import { PublicAppLayout } from '@/layouts/PublicAppLayout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Route, Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicAppLayout />}>
        <Route
          index
          element={<Home />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />
      </Route>

      {/* PRIVATE ROUTES */}
      <Route element={<PrivateAppLayout />}>
        <Route
          path="user"
          element={<div>Here goes private routes</div>}
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
