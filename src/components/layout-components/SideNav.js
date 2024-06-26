import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { DropboxOutlined, BarChartOutlined, TeamOutlined, ProductOutlined, UnorderedListOutlined, HomeOutlined } from "@ant-design/icons";

const SideNav = () => {
	const admin_flag = localStorage.getItem('admin_flag') === 'true';
	const email = localStorage.getItem('email');
	let master;
	if(email){
		if(email === 'adminystoq@ystoq.com'){
			master = true;
		}
	}
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
			<Menu.Item key="3" style={{ display: admin_flag ? 'block' : 'none' }}>
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
				<Link to="/lista-categoria-produto">
					<span style={{ paddingRight: 3 }}>
						<UnorderedListOutlined />
					</span>
					<span>Categorias de Produto</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="6" style={{ display: master ? 'block' : 'none' }}>
				<Link to="/lista-empresa">
					<span style={{ paddingRight: 3 }}>
						<HomeOutlined />
					</span>
					<span>Empresas</span>
				</Link>
			</Menu.Item>
		</Menu>
	);
};

export default SideNav;
