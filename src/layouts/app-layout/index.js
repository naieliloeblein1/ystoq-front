import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import SideNav from "../../components/layout-components/SideNav";
import HeaderNav from "../../components/layout-components/HeaderNav";
import Footer from "../../components/layout-components/Footer";
import Dashboard from "../../views/dashboard";
import Estoque from "../../views/estoque";
import ListaEstoque from "../../views/lista-estoque";
import DetalhesEstoque from "../../views/detalhes-estoque";

const { Content } = Layout;

const AppLayout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HeaderNav />
			<Layout>
				<Layout.Sider>
					<SideNav />
				</Layout.Sider>
				<Layout className="site-layout">
					<Content style={{ margin: "0 16px" }}>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route
								path="/lista-estoque"
								element={<ListaEstoque />}
							/>
							<Route path="/estoque" element={<Estoque />} />
							<Route path="/estoque/:id" element={<Estoque />} />
							<Route
								path="/detalhes-estoque/:id"
								element={<DetalhesEstoque />}
							/>
						</Routes>
					</Content>
					<Footer />
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
