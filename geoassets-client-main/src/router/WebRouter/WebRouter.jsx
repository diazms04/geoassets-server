import { Route, Routes, Navigate } from 'react-router-dom';
import { Home, DashBoard } from '../../pages';
import { useAuth } from '../../hooks';

export function WebRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Home />} />

      {/* Ruta privada: dashboard */}
      <Route
        path="/dashboard"
        element={user ? <DashBoard /> : <Navigate to="/" replace />}
      />

      {/* Cualquier otra ruta desconocida */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
}
