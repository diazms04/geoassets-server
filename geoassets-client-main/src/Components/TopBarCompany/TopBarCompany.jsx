import { Layout, Avatar, Dropdown, Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import logo from "../../assets/png/geoassets_logo.png";
import "./TopBarCompany.scss";

const { Header } = Layout;

export function TopBarCompany() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success("Sesión cerrada");
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="account" onClick={() => navigate("/profile")}>
        Ver cuenta
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="topbar-company">
      {/* Lado izquierdo: logo */}
      <div className="topbar-company-left">
        <img src={logo} alt="Logo" className="topbar-company-logo" />
      </div>

      {/* Lado derecho: avatar */}
      <div className="topbar-company-right">
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Avatar
            size="large"
            style={{
              backgroundColor: "#1890ff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {user?.companyName ? user.companyName[0].toUpperCase() : "U"}
          </Avatar>
        </Dropdown>
      </div>
    </Header>
  );
}
