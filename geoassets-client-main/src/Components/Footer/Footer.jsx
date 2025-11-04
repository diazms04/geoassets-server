import { Layout } from 'antd';
import './Footer.scss';

const { Footer: AntFooter } = Layout;

export function Footer() {
  return (
    <AntFooter className="footer">
      <div className="footer-content">
        <p className="footer-contact">📩 support@geoassets.com</p>
        <p className="footer-rights">© 2025 GeoAssets. Todos los derechos reservados.</p>
      </div>
    </AntFooter>
  );
}
