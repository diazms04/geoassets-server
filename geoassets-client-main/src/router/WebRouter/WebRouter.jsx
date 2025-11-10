import { Route, Routes, Navigate } from 'react-router-dom';
import { CompanyLayout } from '../../layouts';

import { Home, DashBoard, Assets } from '../../pages';
import { useAuth } from '../../hooks';

export function WebRouter() {
  const { user } = useAuth();
  
  const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Home />} />

      {/* Ruta privada: dashboard */}
      <Route path="/dashboard" element={ user ? loadLayout(CompanyLayout, DashBoard) : <Navigate to="/" replace />}/>
      <Route path="/assets" element={ user ? loadLayout(CompanyLayout, Assets) : <Navigate to="/" replace />}/>


      {/* Cualquier otra ruta desconocida */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
}
