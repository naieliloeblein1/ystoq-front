import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import styles from "./styles";
import Swal from "sweetalert2";
import axios from "axios";
import backgroundImage from '../../assets/images/estoque-login.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');

    if(token){
        window.location.href = "/home";
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "senha") {
            setSenha(value);
        }
    };

    const handleLogin = async (values) => {
        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:8080/login', values);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('admin_flag', response.data.admin_flag);
            Swal.fire({
                title: 'Sucesso!',
                text: response.data.message,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.href = "/home";
            }, 1300);
        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: error.response ? error.response.data.error : "Erro ao tentar fazer login.",
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
            });
            setIsSubmitting(false);
        }
    };

    return (
            <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${backgroundImage})`,
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        maxWidth: "400px",
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
                        Login
                    </h1>
                    <Form
                        name="login"
                        onFinish={handleLogin}
                        initialValues={{ email, senha }}
                        style={{
                            marginTop: 20,
                            width: "100%",
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor, insira o email!',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        style={styles.inputForm}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="senha"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor, insira a senha!',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        name="senha"
                                        placeholder="Senha"
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
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={styles.buttonForm}
                                    loading={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                    <div style={{ marginTop: 20 }}>
                        <a href="/cadastro" style={styles.link}>Não possui cadastro?</a>
                    </div>
                </div>
            </div>
    );
};

export default Login;
