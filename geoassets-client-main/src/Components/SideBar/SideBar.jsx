import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  BulbOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import "./Sidebar.scss";

const { Sider } = Layout;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();




  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Activos",
      onClick: () => navigate("/assets"),
    },
    {
      key: "3",
      icon: <BulbOutlined />,
      label: "Innovación",
      onClick: () => navigate("/innovation"),
    },
  ];

  return (
    <Sider collapsible collapsed={collapsed} trigger={null} className="sidebar">
      <div className="sidebar-header">
      </div>

    <div className="sidebar-collapse-btn">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      <Menu
        theme="dark"
        mode="inline"
        items={menuItems}
        defaultSelectedKeys={["1"]}
      />

   
    </Sider>
  );
}
