import React, { useEffect, useState } from "react";
import {
	Space,
	Table,
	Popconfirm,
	Button,
	message,
	Tooltip,
	Row,
	Col,
} from "antd";
import axios from "axios";
import PageContent from "../../components/page-content";
import {
	EditOutlined,
	PlusOutlined,
	UnorderedListOutlined,
	InsertRowLeftOutlined,
} from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/atom/Button";
import { useNavigate } from "react-router-dom";
import ColumnSearchUtil from "../../utils/ColumnSearchUtil";

const columnSearchUtil = new ColumnSearchUtil();

const ListaEstoque = () => {
	const [data, setData] = useState([]);
	// const flag_admin = localStorage.getItem("flag_admin");
	const navigate = useNavigate();
	const columns = [
		{
			title: "Descrição",
			dataIndex: "descricao",
			key: "descricao",
			...columnSearchUtil.getColumnSearchProps("descricao"),
		},
		{
			title: "Endereço",
			dataIndex: "endereco",
			key: "endereco",
		},
		{
			title: "Quantidade máxima",
			dataIndex: "quantidade",
			key: "quantidade",
			sorter: true,
		},
		{
			title: "Ações",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					{/* {flag_admin === "true" && ( */}
					<Popconfirm
						title="Tem certeza que deseja excluir?"
						onConfirm={() => handleDelete(record.id)}
						onCancel={() => {}}
						okText="Sim"
						cancelText="Não"
					>
						<Button type="link" danger icon={<DeleteOutlined />} />
					</Popconfirm>
					{/* )} */}
					{/* {flag_admin === "true" && ( */}
					<Tooltip title="Editar">
						<Link to={`/estoque/${record.id}`}>
							<Button type="link" icon={<EditOutlined />} />
						</Link>
					</Tooltip>
					<Tooltip title="Ver produtos em estoque">
						<Link to={`/produtos-estoque/${record.id}`}>
							<Button
								type="link"
								icon={<UnorderedListOutlined />}
							/>
						</Link>
					</Tooltip>
					<Tooltip title="Ver movimentações do estoque">
						<Link to={`/lista-movimentacao-estoque/${record.id}`}>
							<Button
								type="link"
								icon={<InsertRowLeftOutlined />}
							/>
						</Link>
					</Tooltip>
					{/* )} */}
				</Space>
			),
		},
	];

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/estoque");
			setData(response.data);
		} catch (error) {
			console.error("Erro ao buscar dados:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/estoque/${id}`);
			message.success("Estoque excluído com sucesso!");
			fetchData();
		} catch (error) {
			console.error("Erro ao excluir estoque:", error.message);
			message.error("Erro ao excluir item. Por favor, tente novamente.");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<PageContent>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Row
					gutter={24}
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						marginTop: "40px",
						padding: 28,
						background: "#fff",
						borderTopRightRadius: 5,
						borderTopLeftRadius: 5,
					}}
				>
					<Col span={12}>
						<h1
							style={{
								color: "#377599",
								fontWeight: "bold",
								fontSize: 28,
							}}
						>
							Estoques
						</h1>
					</Col>
					<Col
						span={12}
						style={{
							display: "flex",
							justifyContent: "right",
							alignItems: "center",
						}}
					>
						<ButtonComponent
							title="Cadastrar Estoque"
							style={{ marginRight: "15px" }}
							icon={<PlusOutlined />}
							onClick={() => {
								navigate("/estoque");
							}}
						/>

						<ButtonComponent
							style={{
								background: "rgb(238, 0, 0)",
								border: "1px solid rgb(238, 0, 0)",
								marginRight: "15px",
							}}
							title="Nova saída"
							icon={<PlusOutlined />}
							onClick={() => {
								// navigate("/movimentacao-estoque");
							}}
						/>
						<ButtonComponent
							title="Nova entrada"
							style={{ marginRight: "15px" }}
							icon={<PlusOutlined />}
							onClick={() => {
								// navigate("/movimentacao-estoque");
							}}
						/>
					</Col>
				</Row>
				<Row
					gutter={24}
					style={{
						width: "100%",
					}}
				>
					<Space
						direction="vertical"
						style={{
							width: "100%",
							border: "1px solid #e6ebf1",
							background: "#fff",
							padding: "12px",
						}}
					>
						{" "}
						<Table
							columns={columns}
							dataSource={data}
							scroll={{ x: 240 }}
						/>
					</Space>
				</Row>
			</div>
		</PageContent>
	);
};

export default ListaEstoque;
