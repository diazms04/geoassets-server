import { useAuth } from '../../hooks/useAuth'
import "./Assets.scss";

export function Assets() {
  const { user } = useAuth();

  return (
    <div className="section-assets">
      {/* 🔹 Sub-topbar blanca */}
      <div className="assets-header">
        <div className="assets-header-left">
          <h2>Activos</h2>
        </div>

        <div className="assets-header-right">
          <button className="btn-primary">Agregar</button>
          <button className="btn-secondary">Exportar</button>
        </div>
      </div>

      {/* 🔹 Contenido principal debajo */}
      <div className="assets-content">
        <p>Bienvenido {user?.name || 'usuario'} 👋</p>
      </div>
    </div>
  );
}
