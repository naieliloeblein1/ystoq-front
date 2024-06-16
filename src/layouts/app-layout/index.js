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
import ProdutosEstoque from "../../views/produtos-estoque";
import ListaUsuarios from "../../views/lista-usuarios";
import CadastroUsuario from "../../views/usuario";
import ListaProduto from "../../views/lista-produtos";
import Produto from "../../views/produto";

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
							<Route
								path="/produtos-estoque/:id"
								element={<ProdutosEstoque />}
							/>
							<Route
								path="/lista-usuarios"
								element={<ListaUsuarios />}
							/>
							<Route
								path="/usuario"
								element={<CadastroUsuario />}
							/>
							<Route
								path="/lista-produtos"
								element={<ListaProduto />}
							/>
							<Route path="/produto" element={<Produto />} />
							<Route path="/produto/:id" element={<Produto />} />
						</Routes>
					</Content>
					<Footer />
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
