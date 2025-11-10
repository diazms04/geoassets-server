import { useAuth } from '../../hooks/useAuth'

import "./DashBoard.scss";

export function DashBoard() {
  const { user, logout } = useAuth();

  return (
    <div className="section-home">


      <h1>Dashboard</h1>

      {user ? (
        <div>
          <h2>Información del usuario:</h2>
          <ul>
            {Object.entries(user).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value?.toString()}
              </li>
            ))}
          </ul>

          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No hay usuario logueado</p>
      )}
    </div>
  );
}
