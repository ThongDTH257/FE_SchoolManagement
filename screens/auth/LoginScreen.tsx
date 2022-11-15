import { Button, Card, Checkbox, Col, Form, Input, message, Row } from 'antd';
import Router from 'next/router';
import React, { useState, useEffect } from 'react'
import {
    FcContacts, FcLock
} from "react-icons/fc";
import { apiConfig } from '../../services';
import { Client } from '../../services/services';
function LoginScreen({ }: props) {
    //handle
    const onFinish = async (values: any) => {
        const service = new Client(apiConfig)
        try {
            const res = await service.loginUsingPOST(values.username, values.password)
            apiConfig.setAuthorization(res.token);
            localStorage.setItem("user", JSON.stringify(res));
            Router.push('/student/schedule')
        } catch (error) {
            message.error('Login fail')
        }
    };

    //start
    useEffect(() => {

    }, [])
    return (
        <Row justify='center'
            style={{ height: "80vh" }} align='middle'  >
            <Col lg={{ span: 10 }}  >
                <Card >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<FcContacts className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<FcLock className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="/auth/reset-password">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="/auth/register">register now!</a>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}
interface props {
}
export default LoginScreen