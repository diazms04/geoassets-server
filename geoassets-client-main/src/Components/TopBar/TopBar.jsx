import { useState, useRef, useEffect } from 'react';
import { Layout, Button, Space, Input, message } from 'antd';
import './TopBar.scss';
import logo from '../../assets/png/geoassets_logo.png';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

export function TopBar() {
  const [showLicenseMessage, setShowLicenseMessage] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const handleSignIn = async () => {
    if (!email || !password) {
      setLoginMessage('Por favor completa todos los campos');
      return;
    }

    // 🔹 Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginMessage('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      const result = await handleLogin(email, password);

      if (!result.status) {
        setLoginMessage(result.msg || 'Error al iniciar sesión');
        return;
      }

      setShowSignInForm(false);
      message.success('¡Inicio de sesión exitoso!');
      navigate('/dashboard');

    } catch (error) {
      setLoginMessage('Error al iniciar sesión, intenta de nuevo.');
    }
  };

  // 🔹 Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSignInForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 🔹 Cerrar mensaje de licencia automáticamente
  useEffect(() => {
    if (showLicenseMessage) {
      const timer = setTimeout(() => {
        setShowLicenseMessage(false);
      }, 5000); // desaparece después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [showLicenseMessage]);

  return (
    <div className="topbar-container">
      <Header className="topbar">
        <div className="topbar-left">
          <img src={logo} alt="GeoAssets Logo" className="topbar-logo" />
        </div>

        <div className="topbar-right" style={{ position: 'relative' }}>
          <Space>
            <Button
              type="default"
              className="topbar-btn"
              onClick={() => setShowSignInForm(prev => !prev)}
            >
              Iniciar sesión
            </Button>
            <Button
              type="primary"
              className="topbar-btn"
              onClick={() => setShowLicenseMessage(true)}
            >
              Crear Cuenta
            </Button>
          </Space>

          {showSignInForm && (
            <div className="signin-dropdown" ref={dropdownRef}>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input.Password
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="primary" block onClick={handleSignIn}>
                Ingresar
              </Button>
              {loginMessage && <div className="signin-error">{loginMessage}</div>}
            </div>
          )}
        </div>
      </Header>

      {showLicenseMessage && (
        <div className={`license-message ${showLicenseMessage ? '' : 'hidden'}`}>
          Para solicitar una cuenta, por favor contacta a{' '}
          <strong>licencias@geoassets.com</strong>
        </div>
      )}
    </div>
  );
}
