import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Swal from "sweetalert2";
import moment from "moment";
import Chart from "react-apexcharts";
import PageContent from "../../components/page-content";
import { COLOR_1, COLOR_2, COLOR_4 } from "../../constants/ChartConstant";
import SelectFiltroPeriodo from "../../components/molecule/SelectFiltroPeriodo";

const Dashboard = (props) => {
	// const [data, setData] = useState();
	const [filtros, setFiltros] = useState({
		dataInicio: moment().startOf("month").format(),
		dataFim: moment().endOf("day").format(),
	});
	const [selectedRange, setSelectedRange] = useState(4);

	const obterDados = async () => {
		try {
			await Promise.all([getDashboard()]);
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Falha ao buscar os itens recarregue a página!",
			});
		}
	};

	const getDashboard = async () => {
		// setData(await inteligenciaService.getAll({ filters: { ...filtros } }));
	};

	useEffect(() => {
		obterDados();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtros]);

	const stateEntradaSaida = {
		// series: [
		//     data?.entrada?.novos ?? 0,
		//     data?.saida?.ativos ?? 0
		// ],
		series: [
			{
				name: "Entrada",
				data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 99, 44, 55],
			},
			{
				name: "Saída",
				data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 94, 76, 85],
			},
		],

		options: {
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "80%",
					endingShape: "rounded",
				},
			},

			colors: [COLOR_1, COLOR_2, COLOR_4],

			dataLabels: {
				enabled: false,
			},

			stroke: {
				show: true,
				width: 2,
				colors: ["transparent"],
			},

			xaxis: {
				categories: [
					"Janeiro",
					"Fevereiro",
					"Março",
					"Abril",
					"Maio",
					"Junho",
					"Julho",
					"Agosto",
					"Setembro",
					"Outubro",
					"Novembro",
					"Dezembro",
				],
			},

			fill: {
				opacity: 1,
			},

			// tooltip: {
			// 	y: {
			// 		formatter: (val) => `${val}`,
			// 	},
			// },
		},
	};

	const stateQtdeDisponivel = {
		// series: [
		//     data?.estoque?.map((item) => item.qtde_disponivel) ?? []
		// ],
		series: [
			{
				name: "PRODUCT A",
				data: [44, 55, 41, 67, 22, 43],
			},
			{
				name: "PRODUCT B",
				data: [13, 23, 20, 8, 13, 27],
			},
			{
				name: "PRODUCT C",
				data: [11, 17, 15, 15, 21, 14],
			},
		],

		options: {
			chart: {
				stacked: true,
				toolbar: {
					show: true,
				},
				zoom: {
					enabled: true,
				},
			},

			colors: [COLOR_1, COLOR_2, COLOR_4],

			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: "bottom",
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],

			plotOptions: {
				bar: {
					horizontal: false,
				},
			},

			xaxis: {
				type: "category",
				categories: [
					// data?.estoque?.map((item) => item.descricao) ?? [],\
					"Estoque 1",
					"Estoque 2",
					"Estoque 3",
					"Estoque 4",
					"Estoque 5",
					"Estoque 6",
				],
			},

			legend: {
				position: "right",
				offsetY: 40,
			},

			fill: {
				opacity: 1,
			},
		},
	};

	return (
		<PageContent>
			<div style={{ marginTop: 20 }} id="dashboard">
				<Row
					gutter={24}
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						marginTop: "20px",
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
							Dashboard
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
						<SelectFiltroPeriodo
							rangePicker
							colSpan={16}
							defaultValue={selectedRange}
							onChange={(value) => {
								setSelectedRange(value.id);
								setFiltros({
									...filtros,
									data_inicial: value.start,
									data_final: value.end,
								});
							}}
						/>
					</Col>
				</Row>
				<Row gutter={16} style={{ width: "100%", marginBottom: 30 }}>
					<Card
						title="Entrada e Saída de Produtos"
						style={{
							width: "100%",
							borderWidth: 4,
							border: "1px solid #d4d4d4",
						}}
					>
						<Chart
							options={stateEntradaSaida.options}
							series={stateEntradaSaida.series}
							height={300}
							type="bar"
						/>
					</Card>
				</Row>
				<Row gutter={16} style={{ width: "100%", marginBottom: 30 }}>
					<Card
						title="Produtos Disponíveis por Estoque"
						style={{
							width: "100%",
							borderWidth: 4,
							border: "1px solid #d4d4d4",
						}}
					>
						<Chart
							options={stateQtdeDisponivel.options}
							series={stateQtdeDisponivel.series}
							height={300}
							type="bar"
						/>
					</Card>
				</Row>
			</div>
		</PageContent>
	);
};

export default Dashboard;
