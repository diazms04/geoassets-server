import { TopBar } from "../../Components/TopBar/TopBar";
import { Footer } from "../../Components/Footer/Footer";
import videoSrc from "../../assets/videos/3141210-uhd_3840_2160_25fps.mp4";
import "./Home.scss";

const features = [
  {
    icon: "💻",
    title: "Gestión de Activos",
    description: "Administra computadoras, periféricos y equipos desde una sola plataforma."
  },
  {
    icon: "🧑‍💼",
    title: "Control de Asignaciones",
    description: "Lleva registro de qué empleado tiene cada dispositivo y su historial de uso."
  },
  {
    icon: "🗺️",
    title: "Mapa de Ubicación",
    description: "Visualiza en un mapa la ubicación de todos los activos de tu organización."
  },
  {
    icon: "📁",
    title: "Documentos Asociados",
    description: "Guarda contratos firmados, comprobantes de entrega y documentos de baja segura."
  },
  {
    icon: "📊",
    title: "Reportes y Seguimiento",
    description: "Obtén reportes detallados del estado, movimientos y mantenimiento de los activos."
  },
  {
    icon: "🔐",
    title: "Seguridad y Control",
    description: "Protege la información y asegura trazabilidad en cada acción realizada."
  },
];

export function Home() {
  return (
    <div className="section-home">
      <TopBar />

      {/* Hero Video */}
      <div className="video-container">
        <video className="background-video" autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>

        <div className="video-overlay"></div>

        <div className="video-title">
          <h1>Localiza, administra y optimiza tus activos con precisión.</h1>
        </div>
      </div>

      {/* Título de la sección de características */}
      <div className="features-header">
        <h2>Gestiona tus activos con <span>GeoAssets</span></h2>
        <p>Centraliza toda la información de tus activos tecnológicos en una sola plataforma.</p>
      </div>

      {/* Sección de items debajo del título */}
      <div className="features-section">
        {features.map((item, index) => (
          <div key={index} className="feature-item">
            <div className="feature-icon">{item.icon}</div>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-description">{item.description}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
