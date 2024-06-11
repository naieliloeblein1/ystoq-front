import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderNav = () => {
	return (
		<Header className="header">
			<div className="logo" />
			<h2 style={{ color: "white" }}>Meu Sistema</h2>
		</Header>
	);
};

export default HeaderNav;
