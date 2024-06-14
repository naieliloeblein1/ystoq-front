import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, InputNumber } from "antd";
import PageContent from "../../components/page-content";
import styles from "./styles";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

const CadastroEstoque = () => {
	let { id } = useParams();
	const [estoqueData, setEstoqueData] = useState(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id !== undefined) {
					let response;
					response = await axios.get(
						`http://localhost:8080/estoque/${id}`,
					);
					setEstoqueData(response.data);
				}
				setIsDataLoaded(true);
			} catch (error) {
				console.error("Erro ao buscar dados do estoque:", error);
			}
		};

		fetchData();
	}, [id]);

	if (!isDataLoaded) {
		return <div>Carregando...</div>;
	}
	const onFinish = async (values) => {
		try {
			if (id === undefined) {
				const response = await axios.post(
					"http://localhost:8080/estoque",
					values,
				);
				Swal.fire({
					title: "Sucesso!",
					text: response.data.detail,
					icon: "success",
					timer: 2000,
					showConfirmButton: false,
				});
			} else {
				let response = null;
				if (id > 0) {
					response = await axios.put(
						`http://localhost:8080/estoque/${id}`,
						values,
					);
				} else {
					response = await axios.put(
						`http://localhost:8080/estoque/${estoqueData.id}`,
						values,
					);
				}
				Swal.fire({
					title: "Sucesso!",
					text: response.data.detail,
					icon: "success",
					timer: 2000,
					showConfirmButton: false,
				});
			}

			// Agora, aguarde 2 segundos antes de redirecionar
			setTimeout(() => {
				window.location.href = "/lista-estoque";
			}, 1300);
		} catch (error) {
			Swal.fire({
				title: "Erro!",
				text: error,
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			});
		}
	};

	return (
		<PageContent>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
				}}
			>
				<h1
					style={{
						color: "#377599",
						fontWeight: "bold",
						marginTop: 100,
						fontSize: 28,
					}}
				>
					{id !== undefined ? "Edição " : "Cadastro "}de Estoque
				</h1>
				<Form
					name="cadastro-estoque"
					onFinish={onFinish}
					labelCol={{ span: 12 }}
					wrapperCol={{ span: 24 }}
					style={{
						marginTop: 50,
						width: "100%",
					}}
					initialValues={estoqueData}
				>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="descricao"
								rules={[
									{
										required: true,
										message:
											"Por favor, insira a descrição!",
									},
								]}
							>
								<Input
									placeholder="Descrição*"
									style={styles.inputForm}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="quantidade"
								rules={[
									{
										required: true,
										message:
											"Por favor, insira a quantidade disponível!",
									},
								]}
							>
								<InputNumber
									placeholder="Quantidade disponível (unidade)*"
									style={styles.inputForm}
									min={1}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="endereco"
								rules={[
									{
										required: true,
										message:
											"Por favor, insira o endereço!",
									},
								]}
							>
								<Input
									placeholder="Endereço*"
									style={styles.inputForm}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row
						gutter={16}
						style={{ display: "flex", justifyContent: "center" }}
					>
						<Form.Item>
							<Button style={styles.buttonForm} htmlType="submit">
								{id !== undefined ? "Editar" : "Cadastrar"}
							</Button>
						</Form.Item>
					</Row>
				</Form>
			</div>
		</PageContent>
	);
};

export default CadastroEstoque;
