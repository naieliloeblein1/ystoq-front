import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import backgroundImage from '../../assets/images/estoque-login.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from "./styles";
import InputMask from 'react-input-mask';

const Cadastro = () => {
    const [formData, setFormData] = useState({
        email: '',
        nome: '',
        nome_empresa: '',
        telefone: '',
        cnpj: '',
        senha: '',
        confirmarSenha: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (values) => {
        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:8080/usuario', values);
            console.log('Cadastro realizado com sucesso:', response.data);
            Swal.fire({
                title: 'Sucesso!',
                text: 'Cadastro realizado com sucesso.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.href = "/login";
            }, 1300);
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            Swal.fire({
                title: 'Erro!',
                text: error.response?.data?.error || 'Erro ao tentar fazer cadastro.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            setIsSubmitting(false);
        }
    };

    const validatePassword = (_, value) => {
        if (!value || formData.senha === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('As senhas não coincidem!'));
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    maxWidth: "600px",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        color: "#377599",
                        fontWeight: "bold",
                        fontSize: 28,
                    }}
                >
                    Cadastro
                </h1>
                <Form
                    name="cadastro"
                    onFinish={handleSignup}
                    initialValues={formData}
                    style={{ marginTop: 20, width: "100%" }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor, insira o email!' }]}
                    >
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            style={styles.inputForm}
                        />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nome"
                                rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                            >
                                <Input
                                    type="text"
                                    name="nome"
                                    placeholder="Nome"
                                    onChange={handleChange}
                                    style={styles.inputForm}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="nome_empresa"
                                rules={[{ required: true, message: 'Por favor, insira o nome da empresa!' }]}
                            >
                                <Input
                                    type="text"
                                    name="nome_empresa"
                                    placeholder="Nome da Empresa"
                                    onChange={handleChange}
                                    style={styles.inputForm}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="telefone"
                                rules={[{ required: true, message: 'Por favor, insira o telefone!' }]}
                            >
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                >
                                    {(inputProps) => (
                                        <Input
                                            {...inputProps}
                                            type="text"
                                            name="telefone"
                                            placeholder="Telefone"
                                            style={styles.inputForm}
                                        />
                                    )}
                                </InputMask>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="cnpj"
                                rules={[{ required: true, message: 'Por favor, insira o CNPJ!' }]}
                            >
                                <InputMask
                                    mask="99.999.999/9999-99"
                                    value={formData.cnpj}
                                    onChange={handleChange}
                                >
                                    {(inputProps) => (
                                        <Input
                                            {...inputProps}
                                            type="text"
                                            name="cnpj"
                                            placeholder="CNPJ"
                                            style={styles.inputForm}
                                        />
                                    )}
                                </InputMask>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="senha"
                                rules={[{ required: true, message: 'Por favor, insira a senha!' }]}
                                hasFeedback
                            >
                                <Input.Password
                                    name="senha"
                                    placeholder="Senha"
                                    onChange={handleChange}
                                    style={styles.inputForm}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="confirmarSenha"
                                dependencies={['senha']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Por favor, confirme a senha!' },
                                    { validator: validatePassword }
                                ]}
                            >
                                <Input.Password
                                    name="confirmarSenha"
                                    placeholder="Confirmar Senha"
                                    onChange={handleChange}
                                    style={styles.inputForm}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row
                        gutter={16}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Col>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={styles.buttonForm}
                                    loading={isSubmitting}
                                >
                                    Cadastrar
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div style={{ marginTop: 20 }}>
                    <a href="/login" style={styles.link}>Já possui cadastro? Faça login</a>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
