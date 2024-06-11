import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SideNav = () => {
	return (
		<Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
			<Menu.Item key="1">
				<Link to="/">Dashboard</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="/estoque">Estoque</Link>
			</Menu.Item>
		</Menu>
	);
};

export default SideNav;
