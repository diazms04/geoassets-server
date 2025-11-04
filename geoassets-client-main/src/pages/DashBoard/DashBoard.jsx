import { useAuth } from '../../hooks/useAuth'
import { TopBar } from "../../Components/TopBar/TopBar";
import "./DashBoard.scss";

export function DashBoard() {
  const { user, accessToken, logout } = useAuth();

  return (
    <div className="section-home">
      <TopBar />

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

          <p><strong>Token de acceso:</strong> {accessToken}</p>

          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No hay usuario logueado</p>
      )}
    </div>
  );
}
