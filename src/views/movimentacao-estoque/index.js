import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, InputNumber, DatePicker, AutoComplete  } from "antd";
import PageContent from "../../components/page-content";
import styles from "./styles";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const CadastroMovimentacao = () => {
	let { id } = useParams();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const tipo = queryParams.get('tipo');

	const [movimentacaoData, setMovimentacaoData] = useState(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [estoqueOptions, setEstoqueOptions] = useState([]);
	const [produtoOptions, setProdutoOptions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id !== undefined) {
					let response;
					response = await axios.get(
						`http://localhost:8080/movimentacao-estoque/${id}`,
					);
					setMovimentacaoData(response.data);
				}
				setIsDataLoaded(true);
			} catch (error) {
				console.error("Erro ao buscar dados do estoque:", error);
			}
		};

		fetchData();
	}, [id]);

	useEffect(() => {
		const fetchEstoqueOptions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/estoque");
				setEstoqueOptions(response.data.map(item => ({ value: item.descricao, id: item.id })));
			} catch (error) {
				console.error("Erro ao buscar opções de estoque:", error);
			}
		};

		const fetchProdutoOptions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/produto");
				setProdutoOptions(response.data.map(item => ({ value: item.descricao, id: item.id })));
			} catch (error) {
				console.error("Erro ao buscar opções de produto:", error);
			}
		};

		fetchEstoqueOptions();
		fetchProdutoOptions();
	}, []);

	if (!isDataLoaded) {
		return <div>Carregando...</div>;
	}
	const onFinish = async (values) => {
		try {
			values.tipo = tipo;
			values.id_estoque = getIdByDescription(values.estoque, estoqueOptions);
			values.id_produto = getIdByDescription(values.produto, produtoOptions);

			if (id === undefined) {
				const response = await axios.post(
					"http://localhost:8080/movimentacao-estoque",
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
						`http://localhost:8080/movimentacao-estoque/${id}`,
						values,
					);
				} else {
					response = await axios.put(
						`http://localhost:8080/movimentacao-estoque/${movimentacaoData.id}`,
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
			// setTimeout(() => {
			// 	window.location.href = "/lista-estoque";
			// }, 1300);
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

	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	const getIdByDescription = (description, options) => {
		const option = options.find(option => option.value === description);
		return option ? option.id : null;
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
					{console.log(tipo)}
					{id !== undefined ? "Edição " : "Cadastro "}de Movimentação (
					{tipo !== '1' ? "Entrada" : "Saída"})
				</h1>
				<Form
					name="cadastro-movimentacao"
					onFinish={onFinish}
					labelCol={{ span: 12 }}
					wrapperCol={{ span: 24 }}
					style={{
						marginTop: 50,
						width: "100%",
					}}
					initialValues={movimentacaoData}
				>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="estoque"
								rules={[
									{
										required: true,
										message: "Por favor, selcione o estoque!"
									},
								]}
							>
								<AutoComplete
									options={estoqueOptions}
									placeholder="Estoque*"
									style={styles.inputForm}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="produto"
								rules={[
									{
										required: true,
										message: "Por favor, selcione o produto!"
									},
								]}
							>
								<AutoComplete
									options={produtoOptions}
									placeholder="Produto*"
									style={styles.inputForm}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="quantidade"
								rules={[
									{
										required: true,
										message:
											"Por favor, insira a quantidade movimentada!",
									},
								]}
							>
								<InputNumber
									placeholder="Quantidade (unidade)*"
									style={styles.inputForm}
									min={1}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="data"
								rules={[
									{
										required: true,
										message:
											"Por favor, insira a data da movimentação!",
									},
								]}
							>
								<DatePicker
									placeholder="Data da movimentação*"
									onChange={onChange}
									style={styles.inputForm}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="descricao"
								rules={[
									{
										required: false,
									},
								]}
							>
								<Input
									placeholder="Descrição"
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

export default CadastroMovimentacao;
