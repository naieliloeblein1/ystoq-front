import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { DropboxOutlined, BarChartOutlined, TeamOutlined, ProductOutlined, UnorderedListOutlined } from "@ant-design/icons";

const SideNav = () => {
	return (
		<Menu
			mode="inline"
			style={{
				height: "100%",
				borderRight: 0,
				fontSize: 16,
				color: "#001628",
			}}
		>
			<Menu.Item key="1">
				<Link to="/">
					<span style={{ paddingRight: 3 }}>
						<BarChartOutlined />
					</span>
					<span>Dashboard</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="/lista-estoque">
					<span style={{ paddingRight: 3 }}>
						<DropboxOutlined />
					</span>
					<span>Estoques</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to="/lista-usuarios">
					<span style={{ paddingRight: 3 }}>
						<TeamOutlined />
					</span>
					<span>Usuários</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to="/lista-produtos">
					<span style={{ paddingRight: 3 }}>
						<ProductOutlined />
					</span>
					<span>Produtos</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="5">
				<Link to="/lista-categorias">
					<span style={{ paddingRight: 3 }}>
						<UnorderedListOutlined />
					</span>
					<span>Categorias de Produto</span>
				</Link>
			</Menu.Item>
		</Menu>
	);
};

export default SideNav;
