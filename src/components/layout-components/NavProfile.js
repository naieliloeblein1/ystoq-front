import React from "react";
import { Menu } from "antd";
// import { connect } from "react-redux";
// import { signOut } from "../../../redux/actions/Auth";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import EllipsisDropdown from "../../components/shared-components/EllipsisDropdown";
import { Link } from "react-router-dom";

export const NavProfile = () => {
	const signOut = async () => {
		localStorage.removeItem("email");
		localStorage.removeItem("usuario_flag");
		localStorage.removeItem("admin_flag");
		localStorage.removeItem("token");
	};
	let usuario_flag = null;
	usuario_flag = localStorage.getItem("usuario_flag");

	return (
		<div>
			<div className="nav-profile-header">
				<div>
					<h4 style={{ display: "flex" }}>
						<UserOutlined
							style={{ color: "#fff", fontSize: 20, padding: 3 }}
						/>
						<EllipsisDropdown
							menu={
								<Menu>
									<Menu.Item key="0">
										<Link
											to={`http://localhost:3001/${
												usuario_flag === "true"
													? "usuario"
													: "admin"
											}/0`}
										>
											<div style={{ display: "flex" }}>
												<div style={{ flexGrow: 1 }}>
													<span>Editar</span>
												</div>
												<div>
													<EditOutlined />
												</div>
											</div>
										</Link>
									</Menu.Item>

									<Menu.Divider />

									<Menu.Item
										key="1"
										onClick={(e) => signOut()}
									>
										<Link to={`http://localhost:3000/`}>
											<div style={{ display: "flex" }}>
												<div style={{ flexGrow: 1 }}>
													<span>Sair</span>
												</div>
												<div>
													<LogoutOutlined />
												</div>
											</div>
										</Link>
									</Menu.Item>
								</Menu>
							}
						/>
					</h4>
				</div>
			</div>
		</div>
	);
};

export default NavProfile;
